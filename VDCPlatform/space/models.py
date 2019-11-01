from __future__ import unicode_literals
from django.urls import reverse
from django.db import models

class ProjectInformation(models.Model):
    name = models.CharField(unique=True, max_length=45)

    class Meta:
        managed = False
        db_table = 'project_information'

    def get_absolute_url(self):
        return reverse('space:detail', kwargs={'project_name': self.name})

    def __str__(self):
        return self.name

class ProjectRoom(models.Model):
    project = models.CharField(max_length=45)
    level = models.CharField(max_length=20, blank=True, null=True)
    room_name = models.CharField(max_length=20, blank=True, null=True)
    room_number = models.CharField(max_length=20, blank=True, null=True)
    program_type = models.CharField(max_length=20, blank=True, null=True)
    program_order = models.IntegerField(blank=True, null=True)
    has_av = models.IntegerField(blank=True, null=True)
    has_window = models.IntegerField(blank=True, null=True)
    area = models.FloatField(blank=True, null=True)
    internal_room_count = models.IntegerField(blank=True, null=True)
    work_unit = models.IntegerField(blank=True, null=True)
    physical_desk_count = models.IntegerField(blank=True, null=True)
    group_id = models.CharField(max_length=45, blank=True, null=True)
    group_type = models.CharField(max_length=45, blank=True, null=True)
    upload_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'project_room'


class RoomBoundary(models.Model):
    project = models.ForeignKey(ProjectInformation, models.DO_NOTHING, to_field='name', db_column='project')
    level = models.CharField(max_length=20, blank=True, null=True)
    room_name = models.CharField(max_length=20, blank=True, null=True)
    room_number = models.CharField(max_length=20, blank=True, null=True)
    outline = models.TextField(blank=True, null=True)
    program_type = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'room_boundary'