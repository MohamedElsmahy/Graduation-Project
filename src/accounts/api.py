from django.contrib import auth
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
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


class CkeckAuthenticatedView(APIView):
    def get(self, request,format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated' : 'success'})
            else:
                return Response({'isAuthenticated' : 'error'})
        except:
            return Response({'error': 'Something went wrong checking authentication status'})

@method_decorator(csrf_protect, name='dispatch')
class UserSignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request,format=None):
        data = self.request.data
        try:
            if data['password'] == data['re_password']:
                if MyUser.objects.filter(username=data['username']).exists():
                    return Response ({'error': 'Username already exists'})
                else:
                    user = MyUser.objects.create_user(
                        first_name=data['first_name'],
                        last_name=data['last_name'],
                        username=data['username'],
                        email=data['email'],
                        password=data['password'],
                        is_employer=data['is_employer'])
                        
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

        try:
            user = auth.authenticate(username=data['email'], password=data['password'])

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated', 'email': data['email'], 'is_employer': user.is_employer})
            else:
                return Response({'error':'Error Authenticating'})
        except:
            return Response({ 'error':'Something went wrong when login'})

class LogoutView(APIView):
    def post(self,request,format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Logged out'})
        except:
            return Response({'error':'Somthing went wrong'}) 

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = {permissions.AllowAny,}

    def get(self, request,format=None):
        print()
        return Response ({'success': 'CSRF cookie set'})


class DeleteUserView(APIView):
    def delete(self, request, format=None):
        try:
            user = self.request.user

            MyUser.objects.filter(id=user.id).delete()
            return Response({'success': "user deleted successfully"})
        except:
            return Response({'error': 'something went wrong while deleteing' })


class GetProfile(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            if user.is_employer:
                profile = EmployerProfile.objects.get(user=user)
                profile = EmployerProfileSerializer(profile)
            else:
                profile = EmployeeProfile.objects.get(user=user)
                profile = EmployeeProfileSerializer(profile)

            user = MyUserSerializer(user)

            return Response({"user": user.data, "profile": profile.data})
        except:
            return Response({'error': "something went wrong while retrieveing profile data"})



class UpdateProfileView(APIView):
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def put(self, request, format=None):
        user = self.request.user
        
        if user.is_employer:
            profile = EmployerProfile.objects.get(user=user)
            serializer = EmployerProfileSerializer(profile, data=self.request.data)
        else:
            profile = EmployeeProfile.objects.get(user=user)
            serializer = EmployeeProfileSerializer(profile, data=self.request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)



