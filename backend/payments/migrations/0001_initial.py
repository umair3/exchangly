# Generated by Django 3.2.8 on 2021-10-25 09:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userId', models.IntegerField()),
                ('type', models.CharField(blank=True, default='', max_length=200)),
                ('payload', models.TextField(blank=True, default='')),
                ('eventMeta', models.TextField(blank=True, default='')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paymentGatewayClientSecret', models.CharField(blank=True, default='', max_length=200)),
                ('paymentIntentId', models.CharField(blank=True, default='', max_length=200)),
                ('paymentGatewayCustomerId', models.CharField(blank=True, default='', max_length=200)),
                ('paymentGateway', models.CharField(blank=True, default='stripe', max_length=100)),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('currency', models.CharField(blank=True, default='USD', max_length=3)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('status', models.CharField(blank=True, default='pending', max_length=10)),
                ('userId', models.IntegerField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='orders.order')),
            ],
        ),
    ]
