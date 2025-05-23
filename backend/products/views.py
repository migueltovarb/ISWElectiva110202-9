from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum
from .models import Product
from .serializers import ProductSerializer

class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        product = serializer.save()
        # Auditoría eliminada

    def perform_update(self, serializer):
        product = serializer.save()
        # Auditoría eliminada

    def perform_destroy(self, instance):
        # Auditoría eliminada
        instance.delete()

@api_view(['GET'])
def inventory_report(request):
    user = request.user if request.user.is_authenticated else None

    data = Product.objects.values('category').annotate(
        stock_quantity=Sum('stock_quantity'),
        total_sales=Sum('sale_price')
    )

    # Auditoría eliminada

    return Response(data)
