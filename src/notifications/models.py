from django.db import models

# Create your models here.
from accounts.models import MyUser

from django.db.models.signals import post_save
from django.dispatch import receiver

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
      job=models.ForeignKey(Job, on_delete=models.CASCADE)
      created_at=models.DateTimeField(auto_now_add=True,null=True,blank=True)
      created_by=models.ForeignKey(MyUser,related_name='creatednotifications',on_delete=models.CASCADE,null=True)

      def __str__(self):
         return f" application  for {self.job.title} job from {self.created_by.username}"

      @receiver(post_save, sender=Application)
      def Create_save_job_notification(sender, instance, created, **kwargs):
           if created:
            Notification.objects.create(created_by=instance.applicant,notifications_type='application',is_read=True,job=instance.job,to_user=instance.job.owner)


# class Notification(models.Model):
#     MESSAGE='message'
#     APPLICATION='application'
#     CHOICES=(
#         (MESSAGE,'Message'),
#         (APPLICATION,'Application')
#     )
#     to_user=models.ForeignKey(MyUser,related_name='notifications',on_delete=models.CASCADE)

#     notifications_type=models.CharField(max_length=100,choices=CHOICES)
#     is_read=models.BooleanField(default=False)
#     job=models.ForeignKey(Job, on_delete=models.CASCADE)
#     created_at=models.DateTimeField(auto_now_add=True,null=True,blank=True)
#     created_by=models.ForeignKey(MyUser,related_name='creatednotifications',on_delete=models.CASCADE,null=True)

#     def __str__(self):
#         return f" application  for {self.job.title} job from {self.created_by.username}"

        #  @receiver(post_save, sender=Application)
        #  def Create_save_job_notification(sender, instance, created, **kwargs):
        #    if created:
        #     Notification.objects.create(created_by=instance.applicant,notifications_type='application',is_read=True,job=instance.job,to_user=instance.job.owner)