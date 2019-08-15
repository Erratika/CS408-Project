""""""
from django.db.models import Avg, Count
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Prices, RatingsHostel, RoomSizes, Facilities, Policies, RoomTypes, Hostel
from .serializers import LocationsSerializer, FacilitiesSerializer, PoliciesSerializer, RoomTypesSerializer


# Create your views here.


def index(request):
    """
    Respond with the index page.
    :param request: the request sent to server
    :return: the rendered index page
    """
    views = 'hostels/index.html'
    return render(request, views)


class LocationsViewSet(ReadOnlyModelViewSet):  # pylint: disable=too-many-ancestors
    """"""
    serializer_class = LocationsSerializer

    def get_queryset(self):
        """
        Construct query set for LocationsViewSet,
        :return:
        """
        queryset = Hostel.objects.all()

        # Filter out prices
        price_max = self.request.query_params.get('price_max', None)
        price_min = self.request.query_params.get('price_min', None)
        # if price_max and price_min:
        #     queryset = queryset.filter(
        #         id__in=Prices.objects.values('hostel').annotate(price_average=Avg('price')).filter(
        #             price_average__range=[price_min, price_max]).values('hostel'))
        #
        # # Filter out ratings.
        rating_max = self.request.query_params.get('rating_max', None)
        rating_min = self.request.query_params.get('rating_min', None)
        # if rating_max and rating_min:
        #     queryset = queryset.filter(
        #         id__in=RatingsHostel.objects.values('hostel').annotate(overall_rating=Avg('rating')).filter(
        #             overall_rating__range=[rating_min, rating_max]).values('hostel'))
        #
        # # Filter room sizes
        size_max = self.request.query_params.get('size_max', None)
        size_min = self.request.query_params.get('size_min', None)
        # if size_max and size_min:
        #     queryset = queryset.filter(
        #         prices__room_size__in=RoomSizes.objects.filter(size__range=[size_min, size_max])).distinct('id')
        #
        # # Filter room types
        room_type = self.request.query_params.getlist('roomTypes', [])
        # for r in room_type:
        #     queryset = queryset.filter(prices__room_type=r)
        # # Filter facilities
        facilities = self.request.query_params.getlist('facilities', [])
        # for f in facilities:
        #     queryset = queryset.filter(facilities=f)
        policies = self.request.query_params.getlist('policies', [])
        # for p in policies:
        #     queryset = queryset.filter(policies=p)

        #Gets count of all prices of all Hostels.
        #print(Prices.objects.values('price').annotate(Count('price')).order_by('price'))



        print(Hostel.objects.filter(
            prices__room_size__size__range=(size_min, size_max),
            prices__price__range=(price_min, price_max)

            #prices__room_type__in=room_type,
            #facilities__facility__in=facilities,
            #policies__policy__in=policies,
        ).annotate(Avg('ratingshostel__rating')).query)
        Hostel.objects.select_related('')
        return queryset

    def list(self, request, **kwargs):
        """

        :param request:
        :param kwargs:
        :return:
        """
        queryset = self.get_queryset()
        serializer = LocationsSerializer(queryset, many=True)
        return Response(serializer.data)


class FacilitiesViewSet(ReadOnlyModelViewSet):  # pylint: disable=too-many-ancestors
    """"""
    serializer_class = FacilitiesSerializer
    queryset = Facilities.objects.all().order_by('facility')


class PoliciesViewSet(ReadOnlyModelViewSet):  # pylint: disable=too-many-ancestors
    """"""
    queryset = Policies.objects.all().order_by('policy')
    serializer_class = PoliciesSerializer


class RoomTypesViewSet(ReadOnlyModelViewSet):  # pylint: disable=too-many-ancestors
    """"""
    queryset = RoomTypes.objects.all().order_by('type')
    serializer_class = RoomTypesSerializer
