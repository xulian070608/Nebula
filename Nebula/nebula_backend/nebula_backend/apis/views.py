from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import generics
from rest_framework.filters import SearchFilter

from django_filters.rest_framework import DjangoFilterBackend

from nebula_backend.apis.models import ProjectInfo, Floor, Room
from nebula_backend.apis.serializers import (
    ProjectSerializer,
    FloorSerializer,
    RoomSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = ProjectInfo.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ("project_city",)
    search_fields = ("project_address_en", "project_name", "building_name")


class FloorViewSet(viewsets.ModelViewSet):
    queryset = Floor.objects.all()
    serializer_class = FloorSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ("project_id",)


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ("floor_id",)


class ProjectView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    """
    Get:
        uri: api/v1.1/project
            list projects
        uri api/v1.1/project/<project_id>
            retrive project

    Put:

    Patch:
    Delete:
    """

    queryset = ProjectInfo.objects.all()
    serializer_class = ProjectSerializer

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if pk is not None:
            return self.retrieve(request, pk)
        return self.list(request)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class FloorView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView,
):
    """
    List:
        uri: /api/v1.1/<project_id>/floor

    Get:
        uri: /api/v1.1/<project_id>/floor/<floor_id>

    Put:
    Path:
    """

    serializer_class = FloorSerializer

    def get_queryset(self, *args, **kwargs):
        project_id = kwargs.pop("project", None)
        assert project_id, "Must provide project_id"
        room = Room.objects.filter(project_id=project_id)
        return room
