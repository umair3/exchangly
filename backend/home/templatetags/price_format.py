import decimal

from django import template
from django.utils.safestring import mark_safe

register = template.Library()


def price_format(value: decimal.Decimal):
    print(f"price_format({value}: {type(value)})")
    p = value.__str__().split('.')
    return mark_safe('%s.<sub>%s</sub>' % (p[0], p[1]))


register.filter('price_format', price_format)
