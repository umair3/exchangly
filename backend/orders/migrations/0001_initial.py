# Generated by Django 3.2.8 on 2021-10-25 09:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('charge_options', '0001_initial'),
        ('pricing_plans', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.IntegerField(default=0)),
                ('email', models.CharField(blank=True, default='', max_length=100)),
                ('promo', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('sub_total', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('tax', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('status', models.CharField(blank=True, default='incomplete', max_length=10)),
                ('currency', models.CharField(blank=True, max_length=3)),
                ('recurring_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('discount_with_recurring_coupon', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('coupon_usage_credit', models.IntegerField(blank=True, default=1)),
                ('total_with_recurring_coupon', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.IntegerField(blank=True, default=1)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('expiry', models.DateTimeField(blank=True, null=True)),
                ('trial', models.IntegerField(blank=True, default=0, null=True)),
                ('recurring_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('discount_with_recurring_coupon', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('coupon_usage_credit', models.IntegerField(blank=True, default=0)),
                ('recurring_amount_with_coupon', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('chargeOption', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='charge_options.chargeoption')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='orders.order')),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='pricing_plans.pricingplan')),
            ],
        ),
    ]