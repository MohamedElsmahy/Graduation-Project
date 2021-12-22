from accounts.models import MyUser
from django.db import models
from django.db.models.expressions import OrderBy
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from job.models import Application,Job




class Notification(models.Model):
    MESSAGE='message'
    APPLICATION='application'

    CHOICES=(
        (MESSAGE,'Message'),
        (APPLICATION,'Application')
    )
    to_user=models.ForeignKey(MyUser,related_name='notifications',on_delete=models.CASCADE)
  
    notifications_type=models.CharField(max_length=100,choices=CHOICES)
    is_read=models.BooleanField(default=False)
    namejob=models.CharField(max_length=200,null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True,null=True,blank=True)
    created_by=models.ForeignKey(MyUser,related_name='creatednotifications',on_delete=models.CASCADE,null=True)

    def __str__(self):
        return f"{self.created_by} apply for {self.namejob} job"

    
# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def Create_save_user_notification(sender,created,instance, **kwargs):
#     if created:
#         Notification.objects.create(MyUser=instance)
#         post_save.connect(Create_save_user_notification,sender=Application)

@receiver(post_save, sender=Application)
def Create_save_job_notification(sender, instance, created, **kwargs):
    if created:
            Notification.objects.create(created_by=instance.applicant,notifications_type='application',is_read=True,namejob=instance.job,to_user=instance.job.owner)
    

    
