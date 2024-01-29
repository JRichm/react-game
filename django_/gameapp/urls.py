from django.urls import path
from . import views 

urlpatterns = [
    path("", views.home, name="home"),
    
    path("world/<str:world_name>/", views.world, name='world'),
    path("world/", views.world, name="world_api"),
    
    path("user", views.userApi, name="user_api"),
    path("user/<int:parameter>", views.userApi, name="user_api"),
    
    path("check_pin/", views.check_pin, name='check_pin'), 
]