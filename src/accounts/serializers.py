from rest_framework import serializers
from .models import MyUser ,EmployerProfile, EmployeeProfile

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'is_employer']
        


class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        # fields = ['location','phone_number','image', 'bio', 'website']
        fields = '__all__'

class EmployeeProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeProfile
        # fields = ['location','phone_number','image','cv','website', 'bio', 'title', 'saved_jobs']
        fields = '__all__'