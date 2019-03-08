import json

from django.db.models import Max, Min, Avg
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from hostels.models import *
from .serializers import LocationsSerializer


# Create your views here.

def index(request):
    facilities_all = Facilities.objects.all().order_by('facility').values()
    facilities_all_json = json.dumps(list(facilities_all))
    policies_all = Policies.objects.all().order_by('policy')
    room_types_all = RoomTypes.objects.all()
    price_max = Prices.objects.aggregate(Max('price'))
    price_min = Prices.objects.aggregate(Min('price'))

    context = {'facilities_all': facilities_all,
               'policies_all': policies_all,
               'room_types_all': room_types_all,
               'facilities_json': facilities_all_json}
    views = 'hostels/index.html'
    return render(request, views, context)


class LocationsViewSet(viewsets.ViewSet):
    serializer_class = LocationsSerializer

    def get_queryset(self):
        queryset = Hostel.objects.all()

        # Filter out prices
        price_max = self.request.query_params.get('price-max', None)
        price_min = self.request.query_params.get('price-min', None)
        average_prices = Prices.objects.values('hostel').annotate(price_average=Avg('price'))
        if price_max:
            average_prices = average_prices.filter(price_average__lte=price_max)
        if price_min:
            average_prices = average_prices.filter(price_average__gte=price_min)
        queryset = queryset.filter(id__in=average_prices.values('hostel'))

        # Filter out ratings.
        rating_max = self.request.query_params.get('rating-max')
        rating_min = self.request.query_params.get('rating-min')
        average_ratings = RatingsHostel.objects.values('hostel').annotate(overall_rating=Avg('rating'))
        if rating_max:
            average_ratings = average_ratings.filter(overall_rating__lte=rating_max)
        if rating_min:
            average_ratings = average_ratings.filter(overall_rating__gte=rating_min)
        queryset = queryset.filter(id__in=average_ratings.values('hostel'))

        facilities = self.request.query_params.getlist('facility[]', [])
        # TODO doesnt loop on empty array needs amended.
        for f in facilities:
            queryset = queryset.filter(facilities=f)
        return queryset

    def list(self, request):
        queryset = self.get_queryset().values('name', 'location')
        serializer = LocationsSerializer(queryset, many=True)
        return Response(serializer.data)
