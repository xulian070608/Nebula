from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from nebula_backend.apis.models import ProjectInfo, Level
from nebula_backend.apis.serializers import ProjectSerializer, LevelSerializer


class ProjectViewSet(viewsets.ViewSet):
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
