from django.urls import include, path
from rest_framework import routers

from hostels.views import FacilitiesViewSet,RoomTypesViewSet,PoliciesViewSet,LocationsViewSet

router = routers.DefaultRouter()
router.register('locations', LocationsViewSet, base_name='Location')
router.register('facilities', FacilitiesViewSet, base_name='Facilities')
router.register('policies', PoliciesViewSet, base_name='Policies')
router.register('room_types', RoomTypesViewSet, base_name='RoomTypes')

urlpatterns = [
    path('api/', include(router.urls))

]
