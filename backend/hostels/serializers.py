from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework import serializers

from .models import Hostel, Facilities, Policies, RoomTypes


class LocationsSerializer(GeoFeatureModelSerializer):
    facilities = serializers.SlugRelatedField(slug_field='facility', many=True, read_only=True)
    policies = serializers.SlugRelatedField(slug_field='policy', many=True, read_only=True)

    class Meta:
        model = Hostel
        geo_field = 'location'
        fields = '__all__'


class FacilitiesSerializer(HyperlinkedModelSerializer):
    value = serializers.IntegerField(source='id')
    label = serializers.CharField(source='facility')

    class Meta:
        model = Facilities
        fields = ('value', 'label')


class PoliciesSerializer(HyperlinkedModelSerializer):
    value = serializers.IntegerField(source='id')
    label = serializers.CharField(source='policy')

    class Meta:
        model = Policies
        fields = ('value', 'label')


class RoomTypesSerializer(HyperlinkedModelSerializer):
    value = serializers.IntegerField(source='id')
    label = serializers.CharField(source='type')

    class Meta:
        model = RoomTypes
        fields = ('value', 'label')
