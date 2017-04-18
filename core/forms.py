from django import forms

from core.models import Profile


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['nick_name', 'date_of_birth', 'gender', 'about', 'user']

