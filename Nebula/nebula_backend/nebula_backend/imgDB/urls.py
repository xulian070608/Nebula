from django.urls import path, include

from . import views


urlpatterns = [
    path(r"upload/", views.UploadPhotoViewset.as_view())
] 