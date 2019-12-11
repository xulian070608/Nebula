# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Furnitures(models.Model):
    level_uuid = models.ForeignKey('Levels', models.DO_NOTHING, db_column='level_uuid')
    furniture_type = models.CharField(max_length=20)
    furniture_location = models.TextField()  # This field type is a guess.
    furniture_brand = models.CharField(max_length=50, blank=True, null=True)
    furniture_sku = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'furnitures'


class Levels(models.Model):
    level_uuid = models.UUIDField(primary_key=True)
    project_uuid = models.ForeignKey('Projects', models.DO_NOTHING, db_column='project_uuid', blank=True, null=True)
    level_name = models.CharField(max_length=-1, blank=True, null=True)
    level_elevation = models.FloatField()
    level_update_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'levels'


class Projects(models.Model):
    project_uuid = models.UUIDField(primary_key=True)
    project_name_en = models.CharField(max_length=-1)
    project_location_global = models.TextField()  # This field type is a guess.
    project_name_local = models.CharField(max_length=-1, blank=True, null=True)
    project_address_en = models.CharField(max_length=-1)
    project_adress_local = models.CharField(max_length=-1, blank=True, null=True)
    project_deskcount = models.IntegerField()
    project_physical_deskcount = models.IntegerField()
    project_bim360_url = models.CharField(max_length=-1, blank=True, null=True)
    project_sg_url = models.CharField(max_length=2083, blank=True, null=True)
    project_open_date = models.DateField()
    project_create_date = models.DateField(blank=True, null=True)
    project_update_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'projects'


class Rooms(models.Model):
    room_uuid = models.UUIDField()
    level_uuid = models.UUIDField(blank=True, null=True)
    room_name = models.CharField(max_length=-1)
    room_boundary_vertex = models.TextField()  # This field type is a guess.
    room_hollow_vertex = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'rooms'
