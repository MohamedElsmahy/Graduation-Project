# Generated by Django 3.2.10 on 2021-12-11 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0004_auto_20211211_0952'),
        ('accounts', '0003_auto_20211211_0927'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='saved_jobs',
            field=models.ManyToManyField(blank=True, null=True, to='job.Job'),
        ),
    ]