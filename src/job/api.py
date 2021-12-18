### viwes

from rest_framework.views import APIView
from .models import Application, Job
from .serializers import ApplicationSerializer, JobSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, serializers

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
