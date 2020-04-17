# Generated by Django 3.0.4 on 2020-04-17 03:30

from django.db import migrations, models
import nebula_backend.imgDB.models


class Migration(migrations.Migration):

    dependencies = [
        ('imgDB', '0003_auto_20200416_0734'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='checksum',
            field=models.CharField(blank=True, max_length=40, unique=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='image',
            field=models.ImageField(upload_to=nebula_backend.imgDB.models.nameFile),
        ),
    ]
