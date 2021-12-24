from django.urls import include, path, re_path
from . import views
from . import api
from rest_framework.routers import DefaultRouter

urlpatterns = [

    path('api/',api.Notificationss.as_view() ),

]