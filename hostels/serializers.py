from rest_framework_gis.serializers import GeoFeatureModelSerializer

from .models import Hostel


class LocationsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Hostel
        geo_field = 'location'
        fields = ('name', 'location')
