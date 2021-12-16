from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [   
# path('posts/',views.PostListApi.as_view(), name= "posts"),
path('posts/',views.GetPosts.as_view(), name= "posts"),
path('posts/<int:id>/',views.PostDetail.as_view() , name="post"),

path('comments/',views.CommentListApi.as_view(), name= "comments"),
path('comments/<int:id>/',views.CommentDetail.as_view() , name="comment"),

path('likes/',views.LikeListApi.as_view(), name= "likes"),
path('likes/<int:id>/',views.LikeDetail.as_view() , name="like"),

]