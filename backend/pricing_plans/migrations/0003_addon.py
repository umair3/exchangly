# Generated by Django 3.2.8 on 2022-04-06 21:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pricing_plans', '0002_pricingplan_ui_json'),
    ]

    operations = [
        migrations.CreateModel(
            name='Addon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='parent', to='pricing_plans.pricingplan')),
                ('pricing', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='addon', to='pricing_plans.pricingplan')),
            ],
        ),
    ]
