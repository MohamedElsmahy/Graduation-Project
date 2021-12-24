### get data from models --> generate Json 

from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers
from rest_framework.fields import NullBooleanField
from .models import Interview, Job , Application, Category

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class JobSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='owner.username')
    first_name = serializers.CharField(source='owner.first_name')
    last_name = serializers.CharField(source='owner.last_name')
    published_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    owner = StringSerializer(many=False)
    category = StringSerializer(many=False)
    class Meta:
        model = Job
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    applicant_email = serializers.CharField(source='applicant.email', default="")
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    job = JobSerializer()
    class Meta:
        model=Application
        fields='__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class InterviewSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer()
    created = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    class Meta:
        model = Interview
        fields = "__all__"