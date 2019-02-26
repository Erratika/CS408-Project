from django.db.models import Max, Min, Avg
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from hostels.models import *
from .serializers import LocationsSerializer


# Create your views here.

def index(request):
    all_facilities = Facilities.objects.values_list('facility', flat=True).order_by('facility')
    policies_all = Policies.objects.values_list('policy', flat=True).order_by('policy')
    room_types_all = RoomTypes.objects.values_list('type', flat=True)
    price_max = Prices.objects.aggregate(Max('price'))
    price_min = Prices.objects.aggregate(Min('price'))

    context = {'facilities_all': all_facilities,
               'policies_all': policies_all,
               'room_types_all': room_types_all,
               'price_max': price_max,
               'price_min': price_min}
    views = 'hostels/map.html'
    return render(request, views, context)


class LocationsViewSet(viewsets.ViewSet):
    serializer_class = LocationsSerializer

    def get_queryset(self):
        queryset = Hostel.objects.all()
        averages = Prices.objects.values('hostel').annotate(price_average=Avg('price'))

        if self.request.query_params.get('price_max', None):
            averages = averages.filter(price_average__lte=self.request.query_params.get('price_max', None))
        if self.request.query_params.get('price_min', None):
            averages = averages.filter(price_average__gte=self.request.query_params.get('price_min', None))
        queryset = queryset.filter(id__in=averages.values('hostel'))
        if self.request.query_params.get('rating_max', None):
            queryset = queryset.filter(ratingshostel__rating__lte=self.request.query_params.get('rating_max', None))
        if self.request.query_params.get('rating_min', None):
            queryset = queryset.filter(ratingshostel__rating__gte=self.request.query_params.get('rating_min', None))
            print(queryset)
        return queryset

    def list(self, request):
        queryset = self.get_queryset().values('name', 'location')
        serializer = LocationsSerializer(queryset, many=True)
        return Response(serializer.data)