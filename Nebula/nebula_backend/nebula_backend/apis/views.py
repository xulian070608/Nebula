from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import generics
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from drf_yasg.utils import swagger_auto_schema

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


class ProjectInfoViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    """
    Get:
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
        return self.put(request, *args, **kwargs)


