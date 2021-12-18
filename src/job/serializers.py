### get data from models --> generate Json 

from rest_framework import serializers
from .models import Job , Application

class JobSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='owner.username')
    first_name = serializers.CharField(source='owner.first_name')
    last_name = serializers.CharField(source='owner.last_name')
    class Meta:
        model = Job
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='job.title')
    class Meta:
        model=Application
        fields='__all__'
