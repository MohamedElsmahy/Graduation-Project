from django.views import generic

from accounts.models import EmployeeProfile
from .serializers import EmployeeNotificationSerializer, Notificationserializer
from .models import EmployeeNotification, Notification
from rest_framework.response import Response
from rest_framework import generics,mixins,viewsets


class Notificationss(generics.ListAPIView):
    queryset=Notification.objects.all()
    serializer_class=Notificationserializer
 

class GetEmployeeNotifications(generics.ListAPIView):
    model = EmployeeNotification
    serializer_class = EmployeeNotificationSerializer

    def get_queryset(self):
        user = self.request.user
        employee = EmployeeProfile.objects.get(user=user)
        queryset = EmployeeNotification.objects.filter(receiver=employee).order_by("-created")
        return queryset


# class EmployeeNotifications(APIView):
#     def get(self, request):
