from rest_framework import generics, mixins
from .serializers import PhotoSerializer
from .models import Photo
from rest_framework.response import Response
from rest_framework import status

from os.path import splitext
import uuid


from rest_framework.parsers import JSONParser, MultiPartParser, FormParser, FileUploadParser

class UploadPhotoViewset(
    generics.CreateAPIView
):
    queryset = Photo.objects.all()
    parser_class = (FileUploadParser,)
    serializer_class = PhotoSerializer

    def post(self, request, *args, **kwargs):
        img_file = request.FILES["image"]
        img_file2 = request.data["image"]
        print(img_file == img_file2)
        request.data["size"] = img_file.size
        request.data["title"] =  img_file.name
        request.data["type"] = "image/png"
        print(request.data)
        return self.create(request,*args, **kwargs)
