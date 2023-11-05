# Generated by Django 3.2.8 on 2021-10-25 09:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pricing_plans', '0001_initial'),
        ('coupons', '0001_initial'),
        ('orders', '0001_initial'),
        ('charge_options', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.IntegerField(unique=True)),
                ('expiry', models.DateTimeField()),
                ('status', models.CharField(max_length=50)),
                ('statusDateTime', models.DateTimeField()),
                ('trial_status', models.CharField(blank=True, max_length=50)),
                ('payment_gateway_customer_id', models.CharField(blank=True, default='', max_length=200)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('charge_option', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='charge_options.chargeoption')),
                ('coupon', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='coupons.coupon')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='orders.order')),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='pricing_plans.pricingplan')),
            ],
        ),
    ]