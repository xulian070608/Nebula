from .models import ProjectInfo, Floor, Room
from rest_framework import serializers
from rest_framework_gis import serializers as gs


class FloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Floor
        fields = (
            "url",
            "project_id",
            "floor_id",
            "level_revit_id",
            "floor_name",
            "elevation",
            "deskcount",
            "physical_desk_count",
        )


class ProjectSerializer(serializers.ModelSerializer):
    floors = FloorSerializer(many=True)

    class Meta:
        model = ProjectInfo
        fields = [
            "project_id",
            "pmr_repository_id",
            "building_name",
            "project_name",
            "revit_file_path",
            "business_line",
            "project_adress_point",
            "project_address_en",
            "project_market",
            "project_city",
            "floors",
        ]

class RoomSerializer(gs.GeoModelSerializer):
    class Meta:
        model = Room
        fields = [
            "floor_id",
            "room_revit_id",
            "room_id",
            "room_name",
            "room_number",
            "area",
            "has_window",
            "deskcount",
            "physical_deskcount",
            "program_type",
            "internal_room_count",
            "has_av",
            "outline",
            "level_revit_id",
        ]
