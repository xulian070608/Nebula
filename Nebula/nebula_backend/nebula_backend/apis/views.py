from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from rest_framework import permissions
from nebula_backend.apis.permissions import IsOwner

from nebula_backend.apis.models import ProjectInfo, Level, Room
from nebula_backend.apis.serializers import (
    ProjectSerializer,
    LevelSerializer,
    RoomSerializer,
)


class ProjectViewSet(viewsets.ViewSet):
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_backends = ("project_city",)
    search_fields = ("project_address_en",)

    def list(self, request):
        queryset = ProjectInfo.objects.all()
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = ProjectInfo.objects.all()
        project = get_object_or_404(queryset, pk=pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)


class LevelViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        queryset = Level.objects.all()
        level = get_object_or_404(queryset, pk=pk)
        serializer = LevelSerializer(level)
        return Response(serializer.data)


class RoomViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Room.objects.all()
        serializer = RoomSerializer(queryset, many=True)
        return Response(serializer.data)


class RoomList(generics.ListAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


class ProjectList(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = ProjectSerializer
    queryset = ProjectInfo.objects.all()
    filter_backends = (DjangoFilterBackend, SearchFilter)
    # filter_backends = ("project_city", "project_market")
    search_fields = ("project_address_en",)

