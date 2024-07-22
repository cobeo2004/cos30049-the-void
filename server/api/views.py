from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import PostSerializer

from .models import PostModel

# Create your views here.


class PostListCreate(generics.ListCreateAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer

    def delete(self, request, *args, **kwargs):
        PostModel.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PostListRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'pk'
