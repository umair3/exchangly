# Generated by Django 3.2.8 on 2022-02-28 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('audience', '0002_auto_20220104_0230'),
        ('campaigns', '0003_campaignjob'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='email_body',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='campaign',
            name='email_subject',
            field=models.CharField(default='', max_length=998),
        ),
        migrations.AddField(
            model_name='campaign',
            name='from_email',
            field=models.EmailField(default='', max_length=254),
        ),
        migrations.AddField(
            model_name='campaign',
            name='to_audience',
            field=models.ManyToManyField(to='audience.Audience'),
        ),
    ]
