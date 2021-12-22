from django.urls import include, path, re_path
from . import views
from . import api
from rest_framework.routers import DefaultRouter
router=DefaultRouter()
router.register('notification',api.viewsets_notification)
urlpatterns = [
    
    path('',include(router.urls) ),
    
]