from rest_framework.views import APIView
from .models import Application, Job
from .serializers import ApplicationSerializer, JobSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, permissions
from django.db.models import Q
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

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
    permission_classes = (permissions.AllowAny,)

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



''' Job Application APIs '''

class UserApplyJob(APIView):
    def post(self, request, job_id):
        user = self.request.user
        job = Job.objects.get(id=job_id)
        try:
            if user.is_authenticated:
                if Application.objects.filter(Q(applicant=user) & Q(job=job)).exists():
                    return Response({'error': "You have already applied for this job"})
                else:
                    Application.objects.create(job=job, applicant=user)
                    return Response({'success': "application sent successfully"})
            else:
                return Response({'error': "You have to be looged in for an auto apply"})
        except Exception as e:
            return Response({'error': e.args})


class AnonApplyJob(APIView):
    def post(self, request, job_id):
        data = self.request.data
        job = Job.objects.get(id=job_id)
        try:
            if Application.objects.filter(Q(email=data['email']) & Q(job=job)).exists():
                return Response({'error': "An aplication for this job with this email already exists"})
            else:
                Application.objects.create(
                    job=job,
                    name=data["name"],
                    email=data["email"],
                    website=data["website"],
                    cv=data["cv"],
                    cover_letter=data["cover_letter"])
                return Response({'success': "application sent successfully"})
        except Exception as e:
            return Response({'error': e.args})


class EmployeeApplications(generics.ListAPIView):
    model = Application
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Application.objects.filter(applicant=user).order_by("-created_at")
        return queryset


class EmployerApplications(generics.ListAPIView):
    model = Application
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Application.objects.filter(job__owner_id=user.id).order_by("-created_at")
        return queryset


class ApplicationDetails(generics.RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    lookup_field = 'id'
