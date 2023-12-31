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
            name='Coupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=6)),
                ('generated_by', models.IntegerField()),
                ('used_by', models.IntegerField(blank=True, null=True)),
                ('status', models.CharField(blank=True, max_length=10, null=True)),
                ('usage_credit', models.IntegerField(blank=True, default=1, null=True)),
                ('discount', models.IntegerField(blank=True, default=100, null=True)),
                ('charge_option', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='charge_options.chargeoption')),
                ('pricing_plan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='pricing_plans.pricingplan')),
            ],
        ),
    ]
