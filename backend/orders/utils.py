from .models import Order, OrderItem
from charge_options.models import ChargeOption
# import datetime
# from dateutil import relativedelta
from payments.services import PaymentService


def cancel_incomplete_orders(email):
    try:
        orders = Order.objects.filter(email=email, status='incomplete')
        PaymentService.cancel_payment_intents_by_orders(orders)
        for order in orders:
            order.status = 'CANCELLED'
            order.save()
    except Order.DoesNotExist:
        return False
    return True


def cancel_pending_orders(email):
    try:
        orders = Order.objects.filter(email=email, status='pending')
        PaymentService.cancel_payment_intents_by_orders(orders)
        for order in orders:
            order.status = 'CANCELLED'
            order.save()
    except Order.DoesNotExist:
        return False
    return True


def clean_slate(email):
    cancel_incomplete_orders(email)
    cancel_pending_orders(email)


def has_same_currency(items) -> bool:
    currency = None
    for item in items:
        try:
            charge_option = ChargeOption.objects.get(pk=item['productId'])
            if currency is None:
                currency = charge_option.currency
            if currency != charge_option.currency:
                return False
        except ChargeOption.DoesNotExist:
            pass
    return True








# Create Order Item Entry by ChargeOptionId and UserId
# def create_order_item_old(order: Order, product_id: int, qty: int, skip_trial: bool, coupon_code):
#     # We are creating an order which can have multiple order items.
#     # In this particular scenario, there can be multiple items.
#     # There are two types of items which are of types subscription/product
#     # Say we have a subscription of types onetime, monthly, quarterly, annual. A user can have only one.
#     # Say we have a product which can be Single. Only purchased once, in qty 1.
#     # Say we have a product which can be Multiple. Can be purchased multiple times.
#     # Say we have a product which can be metered.
#     items = OrderItem.objects.get(order=order)
#     if exists_in_order(items, product_id):
#         return False
#     # check if the order has an item or other currency type
#     charge_option: ChargeOption = ChargeOption.objects.get(pk=product_id)
#     order_item = OrderItem()
#     order_item.chargeOption_id = product_id
#     order_item.unitPrice = charge_option.price
#     pricing_plan_id = charge_option.pricingplan_id
#     pricing_plan = Pricingplan.objects.get(pk=pricing_plan_id)
#     if skip_trial is False and trial_available(pricing_plan):
#         order_item.quantity = 1
#         order_item.amount = 0
#         order_item.trial = 1
#         days = int(pricing_plan.trialDurationInDays)
#         order_item.expiry = datetime.datetime.now() + datetime.timedelta(days=days)
#         order_item.discount = 0
#     else:
#         order_item.quantity = qty
#         order_item.amount = order_item.unitPrice * order_item.quantity
#         order_item.expiry = calculate_expiry(charge_option.optionType)
#         discount = 0
#         if coupon_code:
#             discount = coupon_discount(order_item.plan_id, order_item.chargeOption_id, coupon_code)
#         order_item.discount = discount
#     order_item.order_id = order.id
#     order_item.plan_id = charge_option.pricingplan.pk
#     order_item.recurringAmount = order_item.unitPrice * order_item.quantity
#     order_item.save()
#     return order_item
