from django.urls import path
from .api_views import api_list_hat, api_detail_hat

urlpatterns = [
    path("hat/", api_list_hat, name="api_list_hat"),
    path("hat/<int:id>/", api_detail_hat, name="api_detail_hat"),
]
