import django
import os
import sys
import time
import json
import requests

from api.shoes_rest.models import BinVO

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
# from shoes_rest.models import Something
def get_bins():
    response = requests.get("http://monolith:8000/api/bins/")
    content = json.loads(response.content)
    for bbin in content["bins"]:
        BinVO.objects.update_or_create(
            import_href=bbin["href"],
            # defaults
        )


def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
