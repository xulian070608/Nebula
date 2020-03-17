from django.urls import include, path

from rest_framework import routers

# from nebula_backend.quickstart import views

from nebula_backend.apis import views

router = routers.DefaultRouter()
router.register(r"room", views.RoomViewSet, basename="room")
router.register(r"project", views.ProjectViewSet, basename="project")
router.register(r"floor", views.LevelViewSet, basename="floor")


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path(r"api-auth/", include("rest_framework.urls")),
    path(r"apis/v1/", include(router.urls)),
    # path(r"apis/v1/listproject", views.ProjectList.as_view()),
    # path(r"room", views.RoomList.as_view()),
]
