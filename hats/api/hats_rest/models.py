from django.db import models
from django.urls import reverse


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)


class Hat(models.Model):

    fabric = models.CharField(max_length=50)
    style = models.CharField(max_length=50)
    color = models.CharField(max_length=10)
    hat_picture = models.URLField()
    locations = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_hat")
