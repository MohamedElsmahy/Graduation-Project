from django.db import models
from django.utils.text import slugify
from accounts.models import MyUser

# Create your models here.

JOB_TYPE = (
    ('Full time','Full time'),
    ('Part time','Part time'),

)

def image_upload(instance,filename):
    imagename , extension = filename.split(".")
    return "jobs/%s/%s.%s"%(instance.title, imagename, extension)


class Category(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class Job(models.Model):
    owner = models.ForeignKey(MyUser, related_name='job_owner', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    job_type = models.CharField(max_length=15 , choices=JOB_TYPE)
    description = models.TextField(max_length=1000)
    published_at = models.DateTimeField(auto_now=True)
    vacancy = models.IntegerField(default=1)
    salary = models.IntegerField(default=0)
    experince = models.IntegerField(default=1)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    slug = models.SlugField(blank=True, null=True)
    
    ## overriding save() method ##
    def save(self,*args,**kwargs):
        self.slug = slugify(self.title)
        super(Job,self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class Application(models.Model):
    job = models.ForeignKey(Job, related_name='application_job' , on_delete=models.CASCADE)
    applicant = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    cv = models.FileField(upload_to='application/', blank=True, null=True)
    cover_letter = models.TextField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.email} application for {self.job}"
