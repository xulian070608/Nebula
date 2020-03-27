from django.urls import path
from .views import ProjectView, FloorView

urlpatterns = [
    path(r"project/", ProjectView.as_view()),
    path(r"project/<uuid:pk>/", ProjectView.as_view()),
    path(r"project/<uuid:project>/floor", FloorView.as_view()),
]
