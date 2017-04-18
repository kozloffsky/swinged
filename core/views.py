from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render
import logging

from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.forms import ProfileForm
from .models import Profile

logger = logging.getLogger(__name__)


def app(request):
    return render(request, 'core/app.html')


def templates(request, path):
    logger.error("templates path %s" % path)
    return render(request, 'app_templates/%s.html' % path.replace("_", "/"), {"genders": Profile.GENDER_CHOICES})


@api_view(['POST'])
def register(request):
    user_form = UserCreationForm(request.POST)
    if not user_form.is_valid():
        return Response(data={"errors": user_form.errors}, status=500)

    return Response(data=user_form.save().username, status=200)



