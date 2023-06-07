from django.shortcuts import render
from django.db import models
import random
# Create your views here.

def index(request):
    return render(request,"index.html")

def home(request):
    return render(request,"index.html")

def course(request):
    return render(request,"Courses.html")