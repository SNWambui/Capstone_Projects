from django.urls import path
from .views import FileView

urlpatterns = [
    path('predict/', FileView.as_view(), name = 'api_predict'),
]