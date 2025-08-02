from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Save task with the currently logged-in user as owner
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        # Show only tasks that belong to the logged-in user
        user = self.request.user
        if not user or not user.is_authenticated:
            return Task.objects.none()
        return self.queryset.filter(owner=user)