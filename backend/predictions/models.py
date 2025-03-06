from django.db import models

class DisasterEvent(models.Model):
    location = models.CharField(max_length=100)
    date = models.DateField()
    disaster_type = models.CharField(max_length=100)
    severity = models.FloatField()
    lat = models.FloatField()  # Latitude for map
    lon = models.FloatField()  # Longitude for map

    def __str__(self):
        return f"{self.disaster_type} in {self.location} on {self.date}"
