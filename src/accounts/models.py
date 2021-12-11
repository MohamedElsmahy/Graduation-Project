from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from job.models import Job

# Create your models here.


class City(models.Model):
    name = models.CharField(max_length=50)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    city = models.ForeignKey(City, related_name='user_city', on_delete=models.SET_NULL , blank=True, null=True)
    phone_number = models.CharField(max_length = 15)
    image = models.ImageField(upload_to = 'profile/')
    saved_jobs = models.ManyToManyField(Job, blank=True)

    def __str__(self):
        return str(self.user)
        


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

    def __str__(self):
        return self.name