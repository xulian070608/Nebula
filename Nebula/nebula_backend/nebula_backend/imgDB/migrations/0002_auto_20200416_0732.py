# Generated by Django 3.0.4 on 2020-04-16 07:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imgDB', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='photo',
            old_name='image',
            new_name='images',
        ),
        migrations.AlterField(
            model_name='photo',
            name='size',
            field=models.CharField(max_length=50),
        ),
    ]
