from accounts.models import EmployeeProfile
from .serializers import EmployeeNotificationSerializer, Notificationserializer
from .models import EmployeeNotification, Notification
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q


class Notificationss(generics.ListAPIView):
    queryset=Notification.objects.all()
    serializer_class=Notificationserializer
 

class GetEmployeeNotifications(APIView):
    def get(self, request):
        user = self.request.user
        employee = EmployeeProfile.objects.get(user=user)
        queryset = EmployeeNotification.objects.filter(receiver=employee).order_by("-created")
        serializer = EmployeeNotificationSerializer(queryset, many=True)
        unread = queryset.filter(is_read=False).count()
        return Response({"notifications": serializer.data, "unread":unread})


class UpdateEmpNotifications(APIView):
    def patch(self, request, id):

        notification = EmployeeNotification.objects.get(id=id)
        serializer = EmployeeNotificationSerializer(notification, data=self.request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)
