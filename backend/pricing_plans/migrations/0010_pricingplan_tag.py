# Generated by Django 3.2.8 on 2022-08-02 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pricing_plans', '0009_alter_pricingplan_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='pricingplan',
            name='tag',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
