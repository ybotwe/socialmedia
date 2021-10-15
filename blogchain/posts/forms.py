from django import forms
from .models import Posts, Address

class TweetForm(forms.ModelForm):
    class Meta:
        model = Posts
        fields = ['content']

class AddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = ['address', 'post_id']
        