from rest_framework import viewsets
from rest_framework import generics

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

# from rest_framework import permissions
# from nebula_backend.apis.permissions import IsOwner

from nebula_backend.apis.models import ProjectInfo, Level, Room
from nebula_backend.apis.serializers import (
    ProjectSerializer,
    LevelSerializer,
    RoomSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = ProjectInfo.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ("project_city",)
    search_fields = ("project_address_en", "project_name", "building_name")


class LevelViewSet(viewsets.ModelViewSet):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ("project_id",)


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ("floor_id",)


class RoomList(generics.ListAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


class ProjectList(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = ProjectSerializer
    queryset = ProjectInfo.objects.all()
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ("project_address_en",)
