from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, RegisterSerializer

# Create your views here.
class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegisterUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer