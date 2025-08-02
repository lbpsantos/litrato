from django.core.management.base import BaseCommand
from tasks.models import Task

class Command(BaseCommand):
    help = 'Delete tasks with missing or invalid owners.'

    def handle(self, *args, **options):
        tasks_to_delete = Task.objects.filter(owner__isnull=True)
        count = tasks_to_delete.count()
        tasks_to_delete.delete()
        self.stdout.write(self.style.SUCCESS(f'Deleted {count} tasks with missing owners.'))
