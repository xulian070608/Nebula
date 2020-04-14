from nebula_backend.apis import models
from nebula_backend.apis import serializers

from rest_framework import mixins, viewsets
from rest_framework.response import Response

from rest_framework_extensions.mixins import NestedViewSetMixin


class ProjectViewSet(
    NestedViewSetMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    model = models.Project
    serializer_class = serializers.ProjectSerializer
    queryset = models.Project.objects.all()


class FloorViewSet(
    NestedViewSetMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    model = models.Floor
    serializer_class = serializers.FloorSerializer
    lookup_field = "floor_id"

    def get_queryset(self):
        project_id = self.kwargs["parent_lookup_project_id"]
        return models.Floor.objects.filter(project_id=project_id)


class RoomViewSet(
    NestedViewSetMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    model = models.Room
    serializer_class = serializers.RoomSerializer

    def get_queryset(self):
        # project_id = self.kwargs["parent_lookup_floor__project"]
        floor_id = self.kwargs["parent_lookup_floor_id"]
        return models.Room.objects.filter(floor_id=floor_id)
