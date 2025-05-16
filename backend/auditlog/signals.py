# auditlog/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.utils.timezone import now
from .models import AuditLog
import inspect

EXCLUDED_MODELS = ['AuditLog', 'Session', 'LogEntry']

def get_user_from_instance(instance):
    for frame_record in inspect.stack():
        request = frame_record.frame.f_locals.get('request')
        if request and hasattr(request, 'user'):
            return request.user
    return None

@receiver(post_save)
def create_or_update_audit_log(sender, instance, created, **kwargs):
    if sender.__name__ in EXCLUDED_MODELS:
        return

    user = get_user_from_instance(instance)
    action = 'CREATE' if created else 'UPDATE'

    if user and user.is_authenticated:
        AuditLog.objects.create(
            user=user,
            action=action,
            description=f"{'Creó' if created else 'Modificó'} un objeto en {sender.__name__}",
            model_name=sender.__name__,
            object_id=str(instance.pk),
            timestamp=now()
        )

@receiver(post_delete)
def delete_audit_log(sender, instance, **kwargs):
    if sender.__name__ in EXCLUDED_MODELS:
        return

    user = get_user_from_instance(instance)
    if user and user.is_authenticated:
        AuditLog.objects.create(
            user=user,
            action='DELETE',
            description=f"Eliminó un objeto en {sender.__name__}",
            model_name=sender.__name__,
            object_id=str(instance.pk),
            timestamp=now()
        )
