# Generated by Django 3.2.8 on 2022-06-11 09:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Domain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=63)),
                ('verified', models.BooleanField(default=False)),
                ('txt_record', models.CharField(blank=True, max_length=255, null=True)),
                ('spf_txt_record', models.CharField(blank=True, max_length=255, null=True)),
                ('dkim_subdomain', models.CharField(blank=True, max_length=63, null=True)),
                ('dkim_txt_record', models.CharField(blank=True, max_length=255, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]