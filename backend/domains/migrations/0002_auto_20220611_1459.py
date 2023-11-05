# Generated by Django 3.2.8 on 2022-06-11 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('domains', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='domain',
            name='dkim_verified',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='domain',
            name='spf_verified',
            field=models.BooleanField(default=False),
        ),
    ]
