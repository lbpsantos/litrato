from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

router = DefaultRouter()
router.register('', TaskViewSet)  # Automatically handles list, create, retrieve, update, delete

urlpatterns = [
    path('', include(router.urls)),
]