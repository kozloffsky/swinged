from django.contrib.auth.models import User
from django.db import models
from django_timestampable.models import TimestampableModel


class Profile(TimestampableModel):
    """
    Class represent person profile. Main information
    nickname
    age - date of birth
    sex
    location - country and city information
    about - information about person
    """
    GENDER_MALE = 'ml'
    GENDER_FEMALE = 'fml'
    GENDER_TRANS = 'tr'
    GENDER_CHOICES = (
        (GENDER_MALE, 'Male'),
        (GENDER_FEMALE, 'Female'),
        (GENDER_TRANS, 'Transsexual')
    )

    nick_name = models.CharField(blank=False, max_length=30)
    date_of_birth = models.DateField(blank=False)
    date_created = models.DateField(blank=False)
    date_updated = models.DateField(blank=False)
    gender = models.CharField(choices=GENDER_CHOICES, blank=False, max_length=5)
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=False)
    about = models.CharField(max_length=255, blank=False)


class ProfileGroup(TimestampableModel):
    profile = models.ManyToManyField(Profile)
    description = models.CharField(max_length=255, blank=False)
    admin = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=False, related_name='admin')

