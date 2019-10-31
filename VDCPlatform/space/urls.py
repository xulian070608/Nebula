from django.conf.urls import url
from . import views

app_name = 'space'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<project_name>[a-zA-Z\s0-9]+)/$', views.detail, name='detail')
]