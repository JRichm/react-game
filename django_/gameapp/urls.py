from django.urls import path
from . import views 

urlpatterns = [
    path("", views.home, name="home"),
    path("world", views.gameApi, name="game_api"),
    path("world/<int:parameter>", views.gameApi, name="game_api"),
]