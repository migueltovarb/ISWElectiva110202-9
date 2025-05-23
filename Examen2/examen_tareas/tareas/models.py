from django.db import models

class Tarea(models.Model):
    titulo = models.CharField(max_length=255)
    estado = models.BooleanField(default=False)  # False = pendiente, True = completada

    def __str__(self):
        return self.titulo
