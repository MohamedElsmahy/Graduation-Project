### viwes
from rest_framework import response
from rest_framework.views import APIView
from .models import Application, Job
from django.db.models import Q
from .serializers import ApplicationSerializer, JobSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
# import django_filters.rest_framework 

''' Funcation Viwes '''
@api_view(['GET'])
def job_list_api(request):
    all_jobs = Job.objects.all()
    data = JobSerializer(all_jobs , many = True).data 
    return Response({'data':data})

@api_view(['GET'])
def job_detail_api(request , id):
    job_detail = Job.objects.get(id = id)
    data = JobSerializer(job_detail).data 
    return Response({'data':data})


''' Generic Views '''

class JobListApi(generics.ListCreateAPIView):
    model = Job
    queryset  = Job.objects.all()
    serializer_class = JobSerializer

class GetJobs(APIView):
    def get(self, request,format=None):
        try:
            jobs = Job.objects.all()
            jobs = JobSerializer(jobs,many = True)
            return Response({"jobs":jobs.data})
        except Exception as e:
            return Response({'error':"error while get jobs"})

class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    lookup_field = 'id'



class ApplicationApi(generics.ListAPIView):
    model = Application
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationDetail(generics.RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    lookup_field = 'id'


class JobListFilter(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['job_type', 'experince', 'category']
    
        
    
class JobSearch(APIView):
    def get(self,request,format=None):
        queryset = Job.objects.all()
        title = request.GET.get('title', '')
        queryset = Job.objects.filter(title__icontains=title)
        data = JobSerializer(queryset, many = True).data       
        return Response({'job':data})
    