from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    context = {}
    views = ['hostels/map.html', 'hostels/map-input.html']
    return render(request, views, context)
