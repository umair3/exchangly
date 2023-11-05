import decimal

from django import template
from django.utils.safestring import mark_safe

register = template.Library()


def currency_symbol(value: str):
    print(f"currency_symbol({value}: {type(value)})")
    if value == 'USD':
        return '$'
    return False


register.filter('currency_symbol', currency_symbol)
