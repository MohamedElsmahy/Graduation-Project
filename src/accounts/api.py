from django.contrib import auth
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from accounts.models import MyUser , EmployerProfile ,EmployeeProfile
from .serializers import EmployerProfileSerializer, MyUserSerializer,EmployeeProfileSerializer
from django.utils.decorators import method_decorator
class MyUserAPi(generics.CreateAPIView):
    model = MyUser
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer

class EmployerProfileAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployerProfile.objects.all()
    serializer_class = EmployerProfileSerializer
    lookup_field = "id"


class EmployeeProfileAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeeProfile.objects.all()
    serializer_class = EmployeeProfileSerializer
    lookup_field = "id"

@method_decorator(csrf_protect, name='dispatch')
class CkeckAuthenticatedView(APIView):
    def get(self, request,format=None):
        try:
            isAuthenticated = MyUser.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated' : 'success'})
            else:
                return Response({'isAuthenticated' : 'error'})
        except:
            return Response({'error': 'Something went wrong checking authentication status'})

@method_decorator(csrf_protect, name='dispatch')
class UserSignipView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request,format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        re_password = data['re_password']
        is_employer = data['is_employer']
        try:
            if password == re_password:
                if MyUser.objects.filter(username=username).exists():
                    return Response ({'erroe': 'Username already exists'})
                else:
                    user = MyUser.objects.create_user(username=username,password=password,is_employer=is_employer)
                    user.save()
                    return Response ({"success": 'User created successfully'})
            else:
                return Response({'error' : 'Passwords do not match'})
        except:
            return Response({'error':'Something went wrong when registration account'})

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = {permissions.AllowAny,}
    
    def post(self,request,format=None):
        data = self.request.data
        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username,password=password)

            if user is not None:
                auth.login(request,user)
                return Response({'success': 'User authenticated', 'username' :username})
            else:
                return Response({'error':'Error Authenticating'})
        except:
            return Response({ 'error':'Something went wrong when login'})

class LogoutView(APIView):
    def post(self,request,format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Logout'})
        except:
            return Response({'error':'Somthing went wrong'}) 

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = {permissions.AllowAny,}

    def get(self, request,format=None):
        return Response ({'success': 'CSRF cookie set'})