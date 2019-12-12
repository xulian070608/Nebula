from rest_framework.generics import ListAPIView
from projects.serializer import ProjectSerializer
from .models import Projects


class ProjectList(ListAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
