from django.urls import include, path
from rest_framework import routers

from hostels import views

router = routers.DefaultRouter()
router.register('locations', views.LocationsViewSet, base_name='Location')
urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include(router.urls))

]
