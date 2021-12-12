from django.db.models import fields
from rest_framework import serializers
from .models import MyUser ,EmployerProfile, EmployeeProfile

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id','username','email', 'password','is_employer']
        


class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = ['location','company_number','image']

class EmployeeProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeProfile
        fields = ['city','phone_number','image','cv','website']