from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post , Comment , Like
from .serializers import PostSerializer , CommentSerializer, LikeSerializer
from rest_framework import generics
# Create your views here.


'''Generic API Views'''


'''           Posts             '''

#API View for list and create Post
class PostListApi(generics.ListCreateAPIView):
    model = Post
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class GetPosts(APIView):
    def get(self, request, format=None):
        try:
            posts = Post.objects.all()
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
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

#API view for Retrieve , Delete & Update Comment
class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = "id"



'''             Likes                 '''

#API View for list and create Like
class LikeListApi(generics.ListCreateAPIView):
    model = Like
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

#API view for Retrieve , Delete & Update Like
class LikeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    lookup_field = "id"