# Generated by Django 3.2.8 on 2021-11-10 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('integrations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='integration',
            name='default',
            field=models.BooleanField(default=False),
        ),
    ]
