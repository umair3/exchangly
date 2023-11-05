from django.urls import include, path
# from rest_framework import routers
from .views import index

# router = routers.DefaultRouter()
# router.register('players', PlayerViewSet, 'player')
# urlpatterns = router.urls

urlpatterns = [
    path('', index, name='home')
]
