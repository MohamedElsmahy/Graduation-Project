from django.urls import include, path
from . import views ,api

app_name = 'job'

urlpatterns = [
    path('signup/', views.get_user_type , name = 'signup'),
    path('signup/employee/', views.singup_employee , name = 'signup_employee'),
    path('signup/employer/', views.singup_employer , name = 'signup_employer'),
    path('profile/', views.profile , name = 'profile'),
    # path('profile/edit', views.profile_edit , name = 'profile_edit'),

    #APIS
    path('api/singup/',api.MyUserAPi.as_view(),name="signup-api"),
    path('api/employer/<int:id>/',api.EmployerProfileAPI.as_view(),name="employer-api"),
    path('api/employee/<int:id>/',api.EmployeeProfileAPI.as_view(),name="employee-api")
]