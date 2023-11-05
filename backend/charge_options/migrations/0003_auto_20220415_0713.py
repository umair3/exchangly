# Generated by Django 3.2.8 on 2022-04-15 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charge_options', '0002_auto_20220415_0659'),
    ]

    operations = [
        migrations.AddField(
            model_name='chargeoption',
            name='bundle_only',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='chargeoption',
            name='order',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='chargeoption',
            name='recurring',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='chargeoption',
            name='status',
            field=models.CharField(choices=[('PUBLISH', 'Publish'), ('HIDE', 'Hide')], default='PUBLISH', max_length=10),
        ),
    ]