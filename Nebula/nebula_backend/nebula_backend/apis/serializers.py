from .models import Project, Floor, Room
from rest_framework import serializers as drf_serializers
from rest_framework_extensions.fields import ResourceUriField
from rest_framework_json_api import serializers, relations
from rest_framework_gis import serializers as gs


class RoomSerializer(serializers.ModelSerializer, gs.GeoModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"


class FloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Floor
        fields = ("floor_name", "elevation", "project_id")


class NestFloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Floor
        exclude = ["project_id"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
