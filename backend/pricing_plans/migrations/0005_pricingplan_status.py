# Generated by Django 3.2.8 on 2022-04-13 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pricing_plans', '0004_pricingplan_is_addon'),
    ]

    operations = [
        migrations.AddField(
            model_name='pricingplan',
            name='status',
            field=models.CharField(default='PUBLISH', max_length=10),
        ),
    ]
