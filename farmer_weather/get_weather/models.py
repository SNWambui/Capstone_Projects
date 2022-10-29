from django.db import models

# create city model and add it to the database.
class City(models.Model):
    # define the type for the cities
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name

    class Meta:
        # important so that we can call this in other files eg views.py
        verbose_name_plural = 'cities'