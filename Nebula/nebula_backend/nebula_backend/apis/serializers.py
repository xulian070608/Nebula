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
    floor_uri = relations
    class Meta:
        model = Floor
        fields = ("floor_name", "elevation", "project_id")
        extra_kwargs = {
            "project_id": {
                "view_name": "apis:project-detail",
            },
        }


class NestFloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Floor
        exclude = ["project_id"]


class ProjectSerializer(serializers.ModelSerializer):
    project = relations.ResourceRelatedField(
        read_only=True
    )
    project_hyperlinked = relations.HyperlinkedRelatedField(
        related_link_view_name = "apis:project-detail",
        related_link_url_kwarg = "pk",
        self_link_view_name = "project-relationships"
    )

    class Meta:
        model = Project
        fields = "__all__"
        
