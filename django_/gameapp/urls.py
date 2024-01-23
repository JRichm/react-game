from django.urls import path
from . import views 

urlpatterns = [
    path("", views.home, name="home"),
    
    path("world", views.worldApi, name="world_api"),
    path("world/<int:parameter>", views.worldApi, name="world_api"),
    
    path("user", views.userApi, name="user_api"),
    path("user/<int:parameter>", views.userApi, name="user_api"),
]