from django.contrib.gis.db import models


class Facilities(models.Model):
    facility = models.CharField(max_length=45)


class Policies(models.Model):
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
    category = models.CharField(unique=True, max_length=45)


class RatingsHostel(models.Model):
    hostel = models.ForeignKey(Hostel, models.CASCADE, db_column='hostel')
    rating_category = models.ForeignKey(RatingCategories, models.CASCADE, db_column='rating_category', blank=True,
                                        null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)


class Reviews(models.Model):
    hostel = models.ForeignKey(Hostel, models.CASCADE, db_column='hostel')
    review = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)


class RoomSizes(models.Model):
    size = models.IntegerField(unique=True)


class RoomTypes(models.Model):
    type = models.CharField(unique=True, max_length=45)
