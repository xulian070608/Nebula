from django.urls import include, path

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path(r"api/v1/", include(("nebula_backend.apis.urls", "apis"))),
]
