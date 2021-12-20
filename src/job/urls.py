from django.urls import include, path
from . import views
from . import api

app_name = 'job'

urlpatterns = [   
    # path('', views.job_list , name = 'job_list'),
    # path('add', views.add_job , name = 'add_job'),
    # path('<str:slug>', views.job_detail , name = 'job_detail'),
    # path('<int:id>/save', views.save_job , name = 'save_job'),

    # ##API
    # path('api/jobs', api.job_list_api , name = 'job_list_api'),
    # path('api/jobs/<int:id>', api.job_detail_api , name = 'job_detail_api'),
    
    ##Application API
    path('api/applications', api.ApplicationApi.as_view() , name = 'ApplicationsList'),
    path('api/', api.JobListApi.as_view() , name = 'job'),
    path('api/application/<int:id>', api.ApplicationDetail.as_view() , name = 'ApplicationDetail'),
    
    ##Job API
    path('api/jobs/', api.GetJobs.as_view() , name = 'JobsList'),
    path('api/jobs/filter/', api.JobListFilter.as_view() , name = 'JobsListFilter'),
    path('api/<int:id>', api.JobDetail.as_view() , name = 'JobDetail'),

]