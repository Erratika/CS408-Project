# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Facilities(models.Model):
    facilities = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'facilities'


class FacilitiesHostel(models.Model):
    facility = models.ForeignKey(Facilities, models.DO_NOTHING, db_column='facility')
    hostel = models.ForeignKey('Hostel', models.DO_NOTHING, db_column='hostel')

    class Meta:
        managed = False
        db_table = 'facilities_hostel'


class Hostel(models.Model):
    location = models.TextField()  # This field type is a guess.
    description = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=45, blank=True, null=True)
    city = models.CharField(max_length=45, blank=True, null=True)
    country = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hostel'


class Policies(models.Model):
    policy = models.CharField(unique=True, max_length=45)

    class Meta:
        managed = False
        db_table = 'policies'


class PoliciesHostel(models.Model):
    policy = models.ForeignKey(Policies, models.DO_NOTHING, db_column='policy')
    hostel = models.ForeignKey(Hostel, models.DO_NOTHING, db_column='hostel')

    class Meta:
        managed = False
        db_table = 'policies_hostel'


class Prices(models.Model):
    room_type = models.ForeignKey('RoomTypes', models.DO_NOTHING, db_column='room_type')
    hostel = models.ForeignKey(Hostel, models.DO_NOTHING, db_column='hostel')
    room_size = models.ForeignKey('RoomSizes', models.DO_NOTHING, db_column='room_size')
    from_date = models.DateTimeField()
    to_date = models.DateTimeField()
    price = models.DecimalField(max_digits=4, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'prices'


class RatingCategories(models.Model):
    category = models.CharField(unique=True, max_length=45)

    class Meta:
        managed = False
        db_table = 'rating_categories'


class RatingsHostel(models.Model):
    hostel = models.ForeignKey(Hostel, models.DO_NOTHING, db_column='hostel')
    rating_category = models.ForeignKey(RatingCategories, models.DO_NOTHING, db_column='rating_category', blank=True, null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ratings_hostel'


class Reviews(models.Model):
    id = models.IntegerField(primary_key=True)
    hostel = models.ForeignKey(Hostel, models.DO_NOTHING, db_column='hostel')
    review = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)

    class Meta:
        managed = False
        db_table = 'reviews'


class RoomSizes(models.Model):
    size = models.IntegerField(unique=True)

    class Meta:
        managed = False
        db_table = 'room_sizes'


class RoomTypes(models.Model):
    type = models.CharField(unique=True, max_length=45)

    class Meta:
        managed = False
        db_table = 'room_types'
