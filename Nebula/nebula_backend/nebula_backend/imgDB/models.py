from django.db import models

import hashlib


def nameFile(instance, filename):
    return '/'.join(['images', filename])



class Photo(models.Model):
    ImageType = models.TextChoices(
        "ImageType",
        "image/bmp image/gif image/jpeg image/tiff image/png image/svg+xml image/webp",
    )
    photo_id = models.BigAutoField(primary_key=True, db_column="id")
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=65535, blank=True)
    type = models.CharField(max_length=20, choices=ImageType.choices)
    checksum = models.CharField(max_length=40, blank=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    # album_id = models.ForeignKey(
    #     "Album", on_delete=models.CASCADE, db_column="album_id"
    # )
    image = models.ImageField(upload_to=nameFile, null=False, blank=False)
    size = models.CharField(max_length=50)
    tag = models.CharField(max_length=20,null=False, blank=False)
    
    class Meta:
        db_table = "nebula_img"
    
    def save(self, *args, **kwargs):
        print("1111")
        if not self.photo_id:  # file is new
            md5 = hashlib.md5()
            for chunk in self.image.chunks():
                md5.update(chunk)
            self.checksum = md5.hexdigest()
        super().save(*args, **kwargs)
