from .models import Project, Floor, Room
from rest_framework_json_api import serializers
from rest_framework_gis import serializers as gs


class RoomSerializer(serializers.ModelSerializer, gs.GeoModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"
        read_only_fields = (
            "room_id",
            "room_revit_id",
            "floor_id",
            "level_revit_id"
        )


class FloorSerializer(serializers.ModelSerializer):
    included_serializers = {
        "rooms":"nebula_backend.apis.serializers.RoomSerializer"
    }
    class Meta:
        model = Floor
        fields = "__all__"
        read_only_fields = (
            "project_id",
            "level_revit_id",
            "floor_id"
        )


class NestFloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Floor
        exclude = ["project_id"]


class ProjectSerializer(serializers.ModelSerializer):

    included_serializers = {
        "floors":"nebula_backend.apis.serializers.NestFloorSerializer"
    }

    class Meta:
        model = Project
        fields = [
            "stargate_id",
            "pmr_repository_id",
            "project_name",
            "building_name",
            "business_line",
            "landlord_id",
            "project_address_point",
            "project_address_en",
            "project_address_local",
            "project_market",
            "project_city",
            "project_status",
            "usf_per_desk",
            "pmr_branch_id",
            "average_office_desk_count",
            "template_version",
            "revit_file_path",
            "floors"

        ]
        read_only_fields = (
            "floors",
            "project_id",
            "pmr_branch_id",
            "pmr_repository_id",
            "stargate_id"
        )

