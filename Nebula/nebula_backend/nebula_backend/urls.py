from django.urls import include, path, re_path

from rest_framework import routers
from rest_framework import permissions

from nebula_backend.apis import views

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()
router.register(r"room", views.RoomViewSet, basename="room")
router.register(r"project", views.ProjectViewSet, basename="project")
router.register(r"floor", views.FloorViewSet, basename="floor")

schema_view = get_schema_view(
    openapi.Info(
        title="Nebula API",
        default_version="v1",
        description="Nebula API documentation",
        terms_of_service="None",
        contact=openapi.Contact(email="china-vdc@wework.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path(r"api/v1/", include(router.urls)),
    path(r"api/v1.1/", include("nebula_backend.apis.urls"), name="api"),
    re_path(r"^redoc/$", schema_view.with_ui("redoc")),
]
