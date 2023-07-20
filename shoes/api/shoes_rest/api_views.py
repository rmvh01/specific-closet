from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import BinVO, Shoe
from common.json import ModelEncoder


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href",
        "closet_name",
    ]


class ShoesListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
    ]


class ShoesDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "model_name",
        "manufacturer",
        "color",
        "shoe_picture",
        "bin",
    ]
    encoders = {
        "bin": BinVOEncoder(),
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
        print(shoe)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_shoes(request, id):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=id)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.get(id=id).delete()
        return JsonResponse({"deleted": count > 0})
