# Generated by Django 3.2.15 on 2022-09-15 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('email_identities', '0003_emailidentity_default'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emailidentity',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
