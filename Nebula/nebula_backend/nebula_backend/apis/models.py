# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.gis.db import models


class ProjectInfo(models.Model):
    stargate_id = models.UUIDField()
    pmr_repository_id = models.UUIDField()
    project_name = models.CharField(max_length=20, blank=True, null=True)
    building_name = models.CharField(max_length=50, blank=True, null=True)
    business_line = models.UUIDField(blank=True, null=True)
    landlord = models.UUIDField(blank=True, null=True)
    project_adress_point = models.TextField(
        blank=True, null=True
    )  # This field type is a guess.
    project_address_en = models.CharField(max_length=50, blank=True, null=True)
    project_address_local = models.CharField(max_length=50, blank=True, null=True)
    project_market = models.CharField(max_length=50, blank=True, null=True)
    project_city = models.CharField(max_length=50, blank=True, null=True)
    project_status = models.CharField(max_length=50, blank=True, null=True)
    usf_per_desk = models.FloatField(blank=True, null=True)
    building_uuid = models.UUIDField(primary_key=True)
    pmr_branch_id = models.UUIDField(blank=True, null=True)
    average_office_desk_count = models.FloatField(blank=True, null=True)
    template_version = models.CharField(max_length=10, blank=True, null=True)
    revit_file_path = models.CharField(max_length=255, blank=True, null=True)

    def __repr__(self):
        return f'<Project ({self.building_uuid}) "{self.building_name}">'

    class Meta:
        managed = False
        db_table = "project_info"
        unique_together = (("stargate_id", "pmr_repository_id", "pmr_branch_id"),)


class Level(models.Model):
    project = models.ForeignKey(
        ProjectInfo,
        related_name="levels",
        db_column="project",
        on_delete=models.CASCADE,
    )
    level_uuid = models.UUIDField(primary_key=True)
    level_revit_id = models.IntegerField(blank=True, null=True)
    level_name = models.CharField(max_length=50, blank=True, null=True)
    elevation = models.FloatField(blank=True, null=True)
    notes = models.FloatField(blank=True, null=True)
    gsf = models.FloatField(blank=True, null=True)
    usf = models.FloatField(blank=True, null=True)
    rsf = models.FloatField(blank=True, null=True)
    usf_per_desk = models.FloatField(blank=True, null=True)
    deskcount = models.IntegerField(blank=True, null=True)
    average_office_deskcount = models.FloatField(blank=True, null=True)
    geometric_level = models.IntegerField(blank=True, null=True)
    lounge_percent_of_usf = models.FloatField(blank=True, null=True)
    physical_desk_count = models.FloatField(blank=True, null=True)

    def __repr__(self):
        return f'<Level ({self.level_uuid}) "{self.level_name}">'

    class Meta:
        managed = False
        db_table = "level"
        unique_together = (("project", "level_revit_id"),)


class Room(models.Model):
    level_id = models.ForeignKey(
        Level, related_name="rooms", db_column="level_id", on_delete=models.CASCADE
    )
    room_revit_id = models.IntegerField()
    room_uuid = models.UUIDField(primary_key=True)
    room_number = models.CharField(max_length=10, blank=True, null=True)
    room_name = models.CharField(max_length=50, blank=True, null=True)
    area = models.FloatField(blank=True, null=True)
    has_window = models.BooleanField(blank=True, null=True)
    deskcount = models.IntegerField(blank=True, null=True)
    physical_deskcount = models.IntegerField(blank=True, null=True)
    occunpancy = models.UUIDField(blank=True, null=True)
    program_type = models.CharField(max_length=20)
    internal_room_count = models.IntegerField(blank=True, null=True)
    has_av = models.BooleanField(blank=True, null=True)
    outline = models.PolygonField(blank=True, null=True)  # This field type is a guess.
    level_revit_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = "room"


class ProjectLooseFurniture(models.Model):
    room_id = models.UUIDField(blank=True, null=True)
    furniture_id = models.UUIDField(primary_key=True)
    furniture_type_id = models.UUIDField(
        db_column="Furniture_type_id", blank=True, null=True
    )  # Field name made lowercase.
    location_point = models.TextField(
        blank=True, null=True
    )  # This field type is a guess.

    class Meta:
        managed = False
        db_table = "project_loose_furniture"


class ProjectWorkstations(models.Model):
    room_id = models.UUIDField(blank=True, null=True)
    ws_id = models.UUIDField(primary_key=True)
    ws_type_id = models.UUIDField(blank=True, null=True)
    location_point = models.TextField(
        blank=True, null=True
    )  # This field type is a guess.

    class Meta:
        managed = False
        db_table = "project_workstations"


class TestTable(models.Model):
    test_col = models.CharField(max_length=50, blank=True, null=True)
    id = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = "test_table"
