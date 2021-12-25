from rest_framework import serializers

from job.serializers import JobSerializer
from .models import MyUser ,EmployerProfile, EmployeeProfile

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'is_employer']
        


class EmployerProfileSerializer(serializers.ModelSerializer):
    user = MyUserSerializer()
    class Meta:
        model = EmployerProfile
        fields = '__all__'

class EmployeeProfileSerializer(serializers.ModelSerializer):
    user = MyUserSerializer()
    saved_jobs = JobSerializer(many=True)
    class Meta:
        model = EmployeeProfile
        fields = '__all__'