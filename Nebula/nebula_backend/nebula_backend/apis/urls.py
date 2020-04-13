from django.urls import path, include
from rest_framework_extensions.routers import ExtendedDefaultRouter

from . import views

router = ExtendedDefaultRouter()

(
    router.register(r"projects", views.ProjectViewSet, basename="project")
    .register(
        r"floors",
        views.FloorViewSet,
        basename="projects-floor",
        parents_query_lookups=["project_id"],
    )
    .register(
        r"rooms",
        views.RoomViewSet,
        basename="projects-floors-room",
        parents_query_lookups=["floor__project", "floor_id"],
    )
)

urlpatterns = [path(r"", include(router.urls))]

