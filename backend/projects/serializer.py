from rest_framework import serializers
from .models import Rooms, Levels, Projects


class RoomSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rooms
        fields = ["room_name", "room_boundary_vertex"]


class LevelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Levels
        fields = ["level_name", "level_elevation"]


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Projects
        fields = [
            "project_uuid",
            "project_name_en",
            "project_location_global",
            "project_name_local",
            "project_address_en",
            "project_adress_local",
            "project_deskcount",
            "project_physical_deskcount",
            "project_bim360_url",
            "project_sg_url",
            "project_open_date",
            "project_create_date",
            "project_update_time",
        ]

