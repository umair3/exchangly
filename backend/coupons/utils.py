import uuid
from .models import Coupon


def generate_code(string_length=6):
    """Returns a random string of length string_length."""
    # Convert UUID format to a Python string.
    random = str(uuid.uuid4())
    # Make all characters uppercase.
    random = random.upper()
    # Remove the UUID '-'.
    random = random.replace("-", "")
    # Return the random string.
    return random[0:string_length]


def coupon_discount(plan, charge_option, code):
    print(f"coupon_discount({plan}, {charge_option}, {code})")
    try:
        coupon = Coupon.objects.get(code=code)
        print(f"COUPON usedBy: {coupon.usedBy}, pricingPlan: {coupon.pricingPlan_id}, chargeOption: {coupon.chargeOption_id}, ")
        if coupon.usedBy is None or coupon.usedBy == 0:
            if coupon.pricingPlan_id == plan:
                if coupon.chargeOption_id == charge_option:
                    return 100
    except Coupon.DoesNotExist:
        return 0
    return 0


def is_coupon_valid(code) -> bool:
    print(f"is_coupon_valid({code})")
    try:
        coupon: Coupon = Coupon.objects.get(code=code)
        if coupon.usedBy is None or coupon.usedBy == 0:
            if coupon.status != 'USED' and coupon.status != 'PENDING':
                return True
    except Coupon.DoesNotExist:
        pass
    return False


def mark_coupon_pending(code):
    # Mark coupon as pending with status 0
    try:
        coupon = Coupon.objects.get(code=order.promo)
        coupon.usedBy = 0
        coupon.save()
    except Coupon.DoesNotExist:
        pass
