# Generated by Django 3.2.15 on 2022-11-26 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('email_templates', '0004_auto_20220903_1545'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailtemplate',
            name='user_defined',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='useremailtemplate',
            name='user_defined',
            field=models.BooleanField(default=True),
        ),
    ]
