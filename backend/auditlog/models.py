# auditlog/models.py
from django.db import models
from django.conf import settings
from django.utils.timezone import now

class AuditLog(models.Model):
    ACTION_CHOICES = [
        ('CREATE', 'Creación'),
        ('UPDATE', 'Modificación'),
        ('DELETE', 'Eliminación'),
        ('LOGIN', 'Inicio de sesión'),
        ('LOGOUT', 'Cierre de sesión'),
        ('VIEW', 'Consulta'),
        ('EXPORT', 'Exportación'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    description = models.TextField()
    timestamp = models.DateTimeField(default=now)
    model_name = models.CharField(max_length=100, null=True, blank=True)
    object_id = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        username = getattr(self.user, 'username', 'Desconocido')
        return f"{username} - {self.action} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
