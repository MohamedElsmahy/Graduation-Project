from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.models import MyUser
from .models import Post , Comment
from .serializers import PostSerializer , CommentSerializer
from rest_framework import generics
# Create your views here.


'''Generic API Views'''


'''           Posts             '''

#API View for list and create Post
class PostListApi(generics.ListCreateAPIView):
    model = Post
    queryset = Post.objects.all()
    queryset = queryset.order_by("-created")
    serializer_class = PostSerializer

    



class GetPosts(APIView):
    def get(self, request, format=None):
        try:
            posts = Post.objects.all()
            queryset = []
            for post in posts:
                user = MyUser.objects.get(id=post.user.id)
                post['username'] = user.username
                queryset.append(post)
            data = PostSerializer(posts , many = True).data 
            return Response({'posts':data})
        except:
            return Response({'error': "something went wrong when retrieveing posts"})


#API view for Retrieve , Delete & Update Post
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "id"

    


'''            Comment             '''

#API View for list and create Comment
class CommentListApi(generics.ListCreateAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_queryset(self):
        post = Post.objects.get(id=self.kwargs['post_id'])
        queryset = Comment.objects.filter(post=post)
        return queryset


#API view for Retrieve , Delete & Update Comment
class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    lookup_field = "id"

    def get_queryset(self):
        post = Post.objects.get(id=self.kwargs['post_id'])
        queryset = Comment.objects.filter(post=post)
        return queryset



'''             Likes                 '''

# #API View for list and create Like
# class LikeListApi(generics.ListCreateAPIView):
#     model = Like
#     serializer_class = LikeSerializer

#     def get_queryset(self):
#         post = Post.objects.get(id=self.kwargs['post_id'])
#         queryset = Like.objects.filter(post=post)
#         return queryset

# #API view for Retrieve , Delete & Update Like
# class LikeDetail(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = LikeSerializer
#     lookup_field = "id"

#     def get_queryset(self):
#         post = Post.objects.get(id=self.kwargs['post_id'])
#         queryset = Like.objects.filter(post=post)
#         return queryset