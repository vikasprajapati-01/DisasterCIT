from django.urls import path
from .views import predict_disaster

urlpatterns = [
    path('predict/', predict_disaster),
]
