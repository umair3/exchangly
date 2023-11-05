from dateutil import relativedelta
from charge_options.models import ChargeOption
from coupons.models import Coupon
from orders.exceptions import NotIncompleteOrderException
from orders.models import Order, OrderItem
from subscriptions.utils import trial_available
import datetime
import decimal


class OrderService:

    @staticmethod
    def create_order(email, user_id, currency) -> Order:
        print(f"OrderService.create_order({email}, {user_id}, {currency})")
        order = Order()
        order.email = email
        order.user = user_id
        order.currency = currency
        order.status = 'incomplete'
        order.sub_total = 0
        order.discount = 0
        order.tax = 0
        order.total = 0
        order.recurring_amount = 0
        order.discount_with_recurring_coupon = 0
        order.coupon_usage_credit = 0
        order.total_with_recurring_coupon = 0
        order.save()
        return order

    @staticmethod
    def add_order_items(order: Order, items, skip_trial):
        print(f"OrderService.add_order_items({order}, {items}, {skip_trial})")
        for item in items:
            charge_option = ChargeOption.objects.get(pk=item["productId"])
            order_item = OrderItemService.create_order_item(order, charge_option, skip_trial)
            OrderService.update_order_with_order_item(order, order_item)

    @staticmethod
    def update_order_with_order_item(order, order_item: OrderItem):
        print(f"OrderService.update_order_with_order_item({order}, {order_item})")
        order.sub_total = order.sub_total + (order_item.unit_price * order_item.quantity)
        order.save()

    @staticmethod
    def update_order_with_totals(order):
        print(f"OrderService.update_order_with_totals({order})")
        order.sub_total = 0
        order.discount = 0
        order.tax = 0
        order.total = 0
        order.recurring_amount = 0
        order.discount_with_recurring_coupon = 0
        order.total_with_recurring_coupon = 0
        order_items = OrderItem.objects.filter(order=order)
        for order_item in order_items:
            order_item: OrderItem = order_item
            order.sub_total = decimal.Decimal(order.sub_total) + (decimal.Decimal(order_item.unit_price) * order_item.quantity)
            order.discount = decimal.Decimal(order.discount) + decimal.Decimal(order_item.discount)
            order.total = decimal.Decimal(order.total) + decimal.Decimal(order_item.amount)
            order.discount_with_recurring_coupon = decimal.Decimal(order.discount_with_recurring_coupon) + decimal.Decimal(order_item.discount_with_recurring_coupon)
            order.total_with_recurring_coupon = decimal.Decimal(order.total_with_recurring_coupon) + decimal.Decimal(order_item.recurring_amount_with_coupon)
            if order_item.coupon_usage_credit and order_item.coupon_usage_credit > 0:
                order.coupon_usage_credit = order_item.coupon_usage_credit
        order.tax = decimal.Decimal(0)
        order.total = order.total - order.discount + order.tax
        order.recurring_amount = order.sub_total + order.tax
        order.total_with_recurring_coupon = order.total_with_recurring_coupon
        order.save()

    @staticmethod
    def apply_coupon(order: Order, coupon: Coupon):
        print(f"OrderService.apply_coupon({order}, {coupon})")
        if order.discount > 0:
            raise Exception(message="This order already have a discount.")
        order_items = OrderItem.objects.filter(order=order)
        for order_item in order_items:
            if OrderItemService.apply_coupon(order_item, coupon):
                # coupon.usedBy = order.userId
                # coupon.status = 'USED'
                # coupon.save()
                order.promo = coupon.code
                order.save()
                OrderService.update_order_with_totals(order)
                break

    @staticmethod
    def apply_coupon_with_trial(order: Order, coupon: Coupon):
        print(f"OrderService.apply_coupon_with_trial({order}, {coupon})")
        if order.discount > 0:
            raise Exception(message="This order already have a discount.")
        order_items = OrderItem.objects.filter(order=order)
        for order_item in order_items:
            if OrderItemService.apply_coupon(order_item, coupon):
                # coupon.usedBy = order.userId
                # coupon.status = 'PENDING'
                # coupon.save()
                order.promo = coupon.code
                order.save()
                OrderService.update_order_with_totals(order)
                break

    @staticmethod
    def is_valid_order(order: Order) -> bool:
        if order.status == 'incomplete':
            return True
        return False

    @staticmethod
    def get_incomplete_order(order_id: int) -> Order:
        order = Order.objects.get(pk=order_id)
        if not OrderService.is_valid_order(order):
            raise NotIncompleteOrderException(message="This order is not incomplete.")
        return order


def calculate_percent_discount(amount: decimal.Decimal, percent: int) -> decimal.Decimal:
    print(f"calculate_percent_discount({amount}, {percent})")
    if amount and percent:
        return decimal.Decimal(round(amount*percent/100))
    return 0


class OrderItemService:
    @staticmethod
    def with_trial(order: Order) -> bool:
        order_item: OrderItem = OrderItem.objects.get(order_id=order.pk)
        print(f"order item={order_item}")
        if order_item.trial == 1:
            return True
        return False

    @staticmethod
    def apply_coupon(order_item: OrderItem, coupon: Coupon) -> bool:
        print(f"OrderItemService.apply_coupon({order_item}, {coupon})")
        if order_item.plan == coupon.pricing_plan:
            if order_item.chargeOption == coupon.chargeOption:
                order_item.discount = calculate_percent_discount(order_item.amount, coupon.discount)
                order_item.discount_with_recurring_coupon = calculate_percent_discount(order_item.recurring_amount, coupon.discount)
                order_item.coupon_usage_credit = coupon.usageCredit
                order_item.recurring_amount_with_coupon = decimal.Decimal(order_item.recurring_amount) - decimal.Decimal(order_item.discount_with_recurring_coupon)
                order_item.save()
                return True
        return False

    # @staticmethod
    # def apply_recurring_coupon(order_item: OrderItem, coupon: Coupon) -> bool:
    #     if order_item.plan == coupon.pricingPlan:
    #         if order_item.chargeOption == coupon.chargeOption:
    #             order_item.discount = calculate_percent_discount(order_item.amount, coupon.discount)
    #             order_item.discountWithRecurringCoupon = calculate_percent_discount(order_item.recurringAmount, coupon.discount)
    #             order_item.couponUsageCredit = coupon.usageCredit
    #             order_item.save()
    #             return True
    #     return False

    @staticmethod
    def exists_in_order(items, product_id: int) -> bool:
        for item in items:
            if item.type == 'subscription' and item.pk == product_id:
                return True
        return False

    @staticmethod
    def calculate_expiry(option):
        if option == 'monthly':
            a_month = relativedelta.relativedelta(months=1)
            expiry = datetime.datetime.now() + a_month
        elif option == 'annual':
            an_year = relativedelta.relativedelta(years=1)
            expiry = datetime.datetime.now() + an_year
        elif option == '6-months':
            six_months = relativedelta.relativedelta(months=6)
            expiry = datetime.datetime.now() + six_months
        return expiry

    @staticmethod
    def create_order_item(order: Order, charge_option: ChargeOption, skip_trial: bool) -> OrderItem:
        print(f"create_order_item({order}, {charge_option}, {skip_trial})")
        # try:
        #     items = OrderItem.objects.get(order=order.pk)
        #     # if OrderItemService.exists_in_order(items, charge_option.pk):
        #     #     raise Exception(message='An order cannot have multiple items of subscription type.')
        # except OrderItem.DoesNotExist:
        #     pass
        if (skip_trial is False or skip_trial == 0) and trial_available(order.user):
            order_item = OrderItemService.create_order_item_type_subscription_with_trial(order, charge_option)
        else:
            order_item = OrderItemService.create_order_item_type_subscription(order, charge_option)
        return order_item

    @staticmethod
    def create_order_item_type_subscription_with_trial(order: Order, charge_option: ChargeOption):
        print(f"create_order_item_type_subscription_with_trial({order}, {charge_option})")
        order_item = OrderItem()
        order_item.chargeOption = charge_option
        order_item.unit_price = charge_option.price
        pricing_plan = charge_option.pricing_plan
        order_item.quantity = 1
        order_item.amount = 0
        order_item.discount = 0
        order_item.trial = 1
        days = int(pricing_plan.trialDurationInDays)
        order_item.expiry = datetime.datetime.now() + datetime.timedelta(days=days)
        order_item.order_id = order.id
        order_item.plan_id = charge_option.pricing_plan.pk
        order_item.recurring_amount = order_item.unit_price * order_item.quantity
        order_item.save()
        return order_item

    @staticmethod
    def create_order_item_type_subscription(order: Order, charge_option: ChargeOption):
        print(f"create_order_item_type_subscription({order}, {charge_option})")
        order_item = OrderItem()
        order_item.chargeOption = charge_option
        order_item.unit_price = charge_option.price
        order_item.quantity = 1
        order_item.trial = 0
        order_item.amount = order_item.unit_price * order_item.quantity
        order_item.expiry = OrderItemService.calculate_expiry(charge_option.option_type)
        order_item.order = order
        order_item.plan_id = charge_option.pricing_plan.pk
        order_item.recurring_amount = order_item.unit_price * order_item.quantity
        order_item.save()
        return order_item
