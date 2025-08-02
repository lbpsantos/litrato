from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterUserAPIView

urlpatterns = [
    path('register/', RegisterUserAPIView.as_view(), name='user-register'),  # /api/users/register/
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # /api/users/
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]