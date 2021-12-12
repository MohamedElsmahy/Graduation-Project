from django.urls import include, path
from . import views

app_name = 'job'

urlpatterns = [
    path('signup/', views.get_user_type , name = 'signup'),
    path('signup/employee/', views.singup_employee , name = 'signup_employee'),
    path('signup/employer/', views.singup_employer , name = 'signup_employer'),
    path('profile/', views.profile , name = 'profile'),
    # path('profile/edit', views.profile_edit , name = 'profile_edit'),
]