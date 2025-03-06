
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('users/', include('users.urls')),
    path('api/', include('predictions.urls')),
=======
    path('', include('users.urls')),
>>>>>>> 628a513177b58ea56f6fdda0c700d5b75940cd09
]
