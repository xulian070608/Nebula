from django.urls import path
from .views import ProjectInfoViewSet

urlpatterns = [
    path(r"project/", ProjectInfoViewSet.as_view()),
    path(r"project/<uuid:pk>", ProjectInfoViewSet.as_view()),
]
