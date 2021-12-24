from django.views import generic
from .serializers import Notificationserializer
from .models import Notification
from rest_framework.response import Response
from rest_framework import generics,mixins,viewsets

class Notificationss(generics.ListCreateAPIView):
    queryset=Notification.objects.all()
    serializer_class=Notificationserializer
 