from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [   
# path('get-posts/',views.GetPosts.as_view(), name= "posts"),
path('posts/',views.PostListApi.as_view(), name= "posts"),
path('posts/<int:id>/',views.PostDetail.as_view() , name="post"),

path('posts/<int:post_id>/comments/',views.CommentListApi.as_view(), name= "comments"),
path('posts/<int:post_id>/comments/<int:id>/',views.CommentDetail.as_view() , name="comment"),

# path('posts/<int:post_id>/likes/',views.LikeListApi.as_view(), name= "likes"),
# path('posts/<int:post_id>/likes/<int:id>/',views.LikeDetail.as_view() , name="like"),

]