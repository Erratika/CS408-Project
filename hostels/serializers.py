from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework.serializers import HyperlinkedModelSerializer

from .models import Hostel, Facilities, Policies, RoomTypes


class LocationsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Hostel
        geo_field = 'location'
        fields = ('name', 'location')


class FacilitiesSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Facilities
        fields = ('id', 'facility')


class PoliciesSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Policies
        fields = ('id', 'policy')


class RoomTypesSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = RoomTypes
        fields = ('id', 'type')
