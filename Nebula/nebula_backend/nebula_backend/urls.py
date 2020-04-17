from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path(r"api/v1/", include(("nebula_backend.apis.urls", "apis"))),
    path(r"images/", include(("nebula_backend.imgDB.urls", "img_db"))),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
