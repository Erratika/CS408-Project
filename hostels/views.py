from django.db.models import Max, Min, Avg
from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.response import Response
from hostels.models import *
from .serializers import LocationsSerializer, FacilitiesSerializer, PoliciesSerializer, RoomTypesSerializer


# Create your views here.

def index(request):
    facilities_all = Facilities.objects.all().order_by('facility').values()
    policies_all = Policies.objects.all().order_by('policy')
    room_types_all = RoomTypes.objects.all()
    price_max = Prices.objects.aggregate(Max('price'))
    price_min = Prices.objects.aggregate(Min('price'))

    context = {'facilities_all': facilities_all,
               'policies_all': policies_all,
               'room_types_all': room_types_all,
               'price_max': price_max,
               'price_min': price_min}
    views = 'hostels/index.html'
    return render(request, views, context)


class LocationsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LocationsSerializer

    def get_queryset(self):
        queryset = Hostel.objects.all()

        # Filter out prices
        #TODO Reduce use range SEE room sizes
        price_max = self.request.query_params.get('price-max', None)
        price_min = self.request.query_params.get('price-min', None)
        average_prices = Prices.objects.values('hostel').annotate(price_average=Avg('price'))
        if price_max:
            average_prices = average_prices.filter(price_average__lte=price_max)
        if price_min:
            average_prices = average_prices.filter(price_average__gte=price_min)
        queryset = queryset.filter(id__in=average_prices.values('hostel'))

        # Filter out ratings.
        #TODO Reduce use range SEE room sizes
        rating_max = self.request.query_params.get('rating-max',None)
        rating_min = self.request.query_params.get('rating-min',None)
        average_ratings = RatingsHostel.objects.values('hostel').annotate(overall_rating=Avg('rating'))
        if rating_max:
            average_ratings = average_ratings.filter(overall_rating__lte=rating_max)
        if rating_min:
            average_ratings = average_ratings.filter(overall_rating__gte=rating_min)
        queryset = queryset.filter(id__in=average_ratings.values('hostel'))

        #Filter room sizes
        size_max = self.request.query_params.get('size-max',None)
        size_min = self.request.query_params.get('size-min', None)
        if size_max and size_min:
            queryset = queryset.filter(prices__room_size__in=RoomSizes.objects.filter(size__range=[size_min, size_max])).distinct('id')

        #Filter room types
        room_type = self.request.query_params.getlist('room_type[]', [])
        # TODO doesnt loop on empty array needs amended.
        for r in room_type:
            queryset = queryset.filter(prices__room_type=r)
            print(queryset)

        #Filter facilities
        facilities = self.request.query_params.getlist('facility[]', [])
        # TODO doesnt loop on empty array needs amended.
        for f in facilities:
            queryset = queryset.filter(facilities=f)
        policies = self.request.query_params.getlist('policy[]', [])
        # TODO doesnt loop on empty array needs amended.
        for p in policies:
            queryset = queryset.filter(policies=p)
        return queryset

    def list(self, request, **kwargs):
        queryset = self.get_queryset().values('name', 'location')
        serializer = LocationsSerializer(queryset, many=True)
        return Response(serializer.data)


class FacilitiesViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = FacilitiesSerializer
    queryset = Facilities.objects.all().order_by('facility')


class PoliciesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Policies.objects.all().order_by('policy')
    serializer_class = PoliciesSerializer


class RoomTypesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RoomTypes.objects.all().order_by('type')
    serializer_class = RoomTypesSerializer
