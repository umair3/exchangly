# Generated by Django 3.2.8 on 2022-01-03 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
        ('audience', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='audience',
            name='status',
            field=models.CharField(default='subscripbed', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='audience',
            name='tags',
            field=models.ManyToManyField(blank=True, to='tags.Tag'),
        ),
    ]
