from .serializers import Notificationserializer
from rest_framework import viewsets
from .models import Notification

class viewsets_notification(viewsets.ModelViewSet):
    queryset=Notification.objects.all()
    serializer_class=Notificationserializer