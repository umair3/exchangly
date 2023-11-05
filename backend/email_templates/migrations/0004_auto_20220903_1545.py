# Generated by Django 3.2.15 on 2022-09-03 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('email_templates', '0003_auto_20220822_0358'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailtemplate',
            name='order',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='emailtemplate',
            name='status',
            field=models.CharField(choices=[('PUBLISH', 'Publish'), ('HIDE', 'Hide')], default='PUBLISH', max_length=10),
        ),
    ]