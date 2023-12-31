from django.shortcuts import render
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import Hat, LocationVO

# Create your views here.


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "fabric",
        "style",
        "color",
        "hat_picture",
        "locations",
    ]
    encoders = {
        "locations": LocationVODetailEncoder(),
    }


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "fabric",
        "style",
        "color",
        "hat_picture",
        "locations",
    ]
    encoders = {
        "locations": LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hat(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            hats,
            encoder=HatListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            location_href = content['locations']
            location = LocationVO.objects.get(import_href=location_href)
            content["locations"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "invalid location"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_detail_hat(request, id):
    if request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
