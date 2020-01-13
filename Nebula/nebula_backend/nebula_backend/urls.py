from django.urls import include, path

from rest_framework import routers

# from nebula_backend.quickstart import views

from nebula_backend.apis import views

router = routers.DefaultRouter()
router.register(r"rooms", views.RoomViewSet, basename="room")
router.register(r"projects", views.ProjectViewSet, basename="project")
router.register(r"levels", views.LevelViewSet, basename="level")


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path(r"api-auth/", include("rest_framework.urls")),
    path(r"apis/v1/", include(router.urls)),
    # path(r"apis/v1/listproject", views.ProjectList.as_view()),
    # path(r"room", views.RoomList.as_view()),
]
