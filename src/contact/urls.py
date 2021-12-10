from django.urls import include, path
from . import views
import turtle

app_name = 'contact'

urlpatterns = [   
    path('', views.send_message , name = 'contact'),
]

 
