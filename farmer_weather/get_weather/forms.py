
from django.forms import ModelForm, TextInput
from .models import City 

# declare the class for the form, the model to use (where to store data in database) and the given widgets
class CityForm(ModelForm):
    class Meta:
        model = City 
        fields = ['name']
        widgets = {'name' : TextInput(attrs={'class' : 'input', 'placeholder' : 'City Name'})}