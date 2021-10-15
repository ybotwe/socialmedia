from django.db import models

class Posts(models.Model):
    content = models.CharField("What's on your mind?", max_length = 300)

class Address(models.Model):
    address = models.CharField("Type in your ethereum address?", max_length = 300)
    post_id = models.IntegerField("Input post id")