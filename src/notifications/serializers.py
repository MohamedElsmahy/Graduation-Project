from django.db.models import fields
from rest_framework import serializers

from .models import Notification
class Notificationserializer(serializers.ModelSerializer):
    class Meta:
        model=Notification
        fields='__all__'