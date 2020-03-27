from .models import ProjectInfo, Floor, Room
from rest_framework import serializers
from rest_framework_gis import serializers as gs


class HostProjectSerializer()


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

        read_only_fields = ("project_id", "floor_id", "level_revit_id")


class ProjectSerializer(serializers.ModelSerializer):
    floors = FloorSerializer(many=True, read_only=True)

    class Meta:
        model = ProjectInfo
        fields = [
            "project_id",
            "pmr_repository_id",
            "building_name",
            "project_name",
            "revit_file_path",
            "business_line",
            "project_address_point",
            "project_address_en",
            "project_market",
            "project_city",
            "floors",
        ]
        read_only_fields = (
            "project_id",
            "pmr_repository_id",
        )


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
