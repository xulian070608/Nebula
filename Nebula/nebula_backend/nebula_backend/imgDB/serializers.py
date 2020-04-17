from rest_framework import serializers
from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()    
    class Meta:
        model = Photo
        fields = "__all__"