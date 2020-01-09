from django.urls import include, path

from rest_framework import routers

# from nebula_backend.quickstart import views

from nebula_backend.apis.views import ProjectViewSet, LevelViewSet


router = routers.DefaultRouter()
# router.register(r"users", views.UserViewSet)
# router.register(r"groups", views.GroupViewSet)
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"level", LevelViewSet, basename="level")
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path(r"apis/v1/", include(router.urls)),
]
