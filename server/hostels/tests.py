# Create your tests here.
from rest_framework.test import APITestCase
from django.test import TestCase
from .models import *


class FacilitiesTestCase(TestCase):

    def test__creation(self):
        f = Facilities.objects.create(facility='Facility')
        self.assertEqual(f.facility, 'Facility')


class PoliciesTestCase(TestCase):
    def test__creation(self):
        f = Facilities.objects.create(facility='Facility')
        self.assertEqual(f.facility, 'Facility')


class HostelTestCase(TestCase):
    def test__creation(self):
        f = Facilities.objects.create(facility='Facility')
        self.assertEqual(f.facility, 'Facility')


class Prices(TestCase):
    def test__creation(self):
        f = Facilities.objects.create(facility='Facility')
        self.assertEqual(f.facility, 'Facility')


class RatingCategoriesTestCase(TestCase):
    def test__creation(self):
        f = Facilities.objects.create(facility='Facility')
        self.assertEqual(f.facility, 'Facility')


class RatingsHostelTestCase(TestCase):
    def test__creation(self):
        f = Facilities.objects.create(facility='Facility')
        self.assertEqual(f.facility, 'Facility')


class ReviewsTestCase(TestCase):
    def test__creation(self):
        f = Facilities.objects.create(facility='Facility')
        self.assertEqual(f.facility, 'Facility')


class RoomSizesTestCase(TestCase):
    def test__creation(self):
        f = Facilities.objects.create(facility='Facility')
        self.assertEqual(f.facility, 'Facility')


class RoomTypesTestCase(TestCase):
    def test__creation(self):
        f = Facilities.objects.create(facility='Facility')
        self.assertEqual(f.facility, 'Facility')


class HostelsGetAllTestCase(APITestCase):
    def setUp(self):
        return
