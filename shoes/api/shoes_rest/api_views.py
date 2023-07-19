from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import BinVO, Shoe
from common.json import ModelEncoder


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href",
    ]


class ShoesListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "href",
    ]


class ShoesDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "shoe",
        "manufacturer",
        "color",
        "shoe_picture",
        "bin",
    ]
    encoders = {
        "shoe": ShoesListEncoder,
        "bin": BinVOEncoder,
    }



@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            shoes,
            encoder=ShoesListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = content["bin"]
            bbin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bbin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "invalid bin id"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_shoes(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.get(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
