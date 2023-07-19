from django.db import models
from django.urls import reverse

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)


class Shoe(models.Model):
    model_name = models.CharField(max_length=50)
    manufacturer = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    shoe_picture = models.URLField()
    bin = models.ForeignKey(
        BinVO,
        related_name="bin",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_list_shoes", kwargs={"pk": self.pk}) # this is for the detial view, remove the kwargs parameter and related name to get the list view
