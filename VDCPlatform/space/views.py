from django.shortcuts import render
from .models import ProjectInformation, RoomBoundary

def index(request):
    project_info_list = ProjectInformation.objects.all()
    return render(request, 'space/index.html', context={'project_info_list': project_info_list})


def detail(request, project_name):
    # project = get_object_or_404(ProjectInformation, name=project_name)
    room_info_list = RoomBoundary.objects.filter(project__name=project_name)
    return render(request, 'space/layout.html', context={'room_info_list': room_info_list,
                                                       'project_name': project_name})
