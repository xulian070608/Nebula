from .models import ProjectInfo, Level
from rest_framework import serializers


class SimpleLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = (
            "level_uuid",
            "level_name",
            "elevation",
            "physical_desk_count",
        )


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = (
            "project",
            "level_uuid",
            "level_revit_id",
            "level_name",
            "elevation",
            "deskcount",
            "physical_desk_count",
        )


class ProjectSerializer(serializers.ModelSerializer):
    # levels_uuid = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    levels = SimpleLevelSerializer(many=True, read_only=True)

    class Meta:
        model = ProjectInfo
        fields = [
            "building_uuid",
            "pmr_repository_id",
            "building_name",
            "project_name",
            "revit_file_path",
            "business_line",
            "project_adress_point",
            "project_address_en",
            "project_market",
            "project_city",
            "levels",
        ]

