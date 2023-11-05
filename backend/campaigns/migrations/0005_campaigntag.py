# Generated by Django 3.2.8 on 2022-03-27 05:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('campaigns', '0004_auto_20220228_1618'),
    ]

    operations = [
        migrations.CreateModel(
            name='CampaignTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='campaigns.campaign')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='tags.tag')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]