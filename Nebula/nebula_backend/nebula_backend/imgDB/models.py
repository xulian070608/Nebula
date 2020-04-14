from django.db import models
from time import time


class Album(models.ModeL):
    pass


class Photos(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=65535, blank=True)
    type = models.CharField(max_length=100)
    checksum = models.CharField(max_length=40, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    album_id = models.ForeignKey("Album", on_delete=models.CASCADE,related_name="id",)

    class Meta:
        abstract = True