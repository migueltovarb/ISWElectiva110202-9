# auditlog/utils.py
from .models import AuditLog

def create_audit_log(user, action, description, model_name=None, object_id=None):
    AuditLog.objects.create(
        user=user,
        action=action,
        description=description,
        model_name=model_name,
        object_id=object_id
    )
