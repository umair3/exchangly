# Generated by Django 3.2.8 on 2022-08-11 01:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0002_auto_20220524_1330'),
    ]

    operations = [
        migrations.RenameField(
            model_name='paymentevent',
            old_name='userId',
            new_name='user',
        ),
    ]
