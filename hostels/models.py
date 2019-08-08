"""Contains declarations for database models."""
from django.contrib.gis.db import models


class Facilities(models.Model):
    """A model that represents all the different types of Facilities offered by Hostels
        i.e. Free Wifi, Lockers, e.t.c."""
    facility = models.CharField(max_length=45)


class Policies(models.Model):
    """A model that represents types of Policies in place by Hostels
            i.e. Age Restriction, Credit Card Not Accepted, e.t.c."""
    policy = models.CharField(unique=True, max_length=45)


class Hostel(models.Model):
    name = models.CharField(max_length=200)
    location = models.PointField(geography=True, srid=4326)  # This field type is a guess.
    description = models.TextField(blank=True, null=True)
    facilities = models.ManyToManyField(Facilities)
    policies = models.ManyToManyField(Policies)


class Prices(models.Model):
    room_type = models.ForeignKey('RoomTypes', models.CASCADE, db_column='room_type')
    hostel = models.ForeignKey(Hostel, models.CASCADE, db_column='hostel')
    room_size = models.ForeignKey('RoomSizes', models.CASCADE, db_column='room_size')
    from_date = models.DateTimeField()
    to_date = models.DateTimeField()
    price = models.DecimalField(max_digits=16, decimal_places=2)


class RatingCategories(models.Model):
    """A model that represents all the Categories on which hostels are rated on
            i.e. Location, Cleanliness, Value for Money"""
    category = models.CharField(unique=True, max_length=45)


class RatingsHostel(models.Model):
    hostel = models.ForeignKey(Hostel, models.CASCADE, db_column='hostel')
    rating_category = models.ForeignKey(RatingCategories,
                                        models.CASCADE,
                                        db_column='rating_category',
                                        blank=True,
                                        null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)


class Reviews(models.Model):
    """A model that represents Hostels reviews"""
    hostel = models.ForeignKey(Hostel, models.CASCADE, db_column='hostel')
    review = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)


class RoomSizes(models.Model):
    """A model that represents types of Room Sizes available for Hostels where each bed as counted
                as one. (Double = 1, Twin = 2)"""
    size = models.IntegerField(unique=True)


class RoomTypes(models.Model):
    """A model that represents types of Rooms offered by Hostels.
                i.e. Private, Male Only, Female Only e.t.c."""
    type = models.CharField(unique=True, max_length=45)
