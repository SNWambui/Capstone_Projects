# import other modules and libraries: in general make sure to pip install these
from email.mime import base
import requests
from django.shortcuts import render, redirect, HttpResponseRedirect
from django.urls import reverse
from .models import City #city model
from .forms import CityForm # form for user to fill to get city

from datetime import datetime
from folium import Map, LayerControl, Marker
from folium.raster_layers import TileLayer
from folium.plugins import HeatMap

import os
import environ



# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# set the environment and DEBUG status
env = environ.Env()
api_key = env('WEATHER_API_KEY')
# print("This is api_keu", api_key)

def show_weather_map(city_coords, city_temp):
    # starting center of the map
    center = city_coords

    # base map
    base_map = Map(
        location=center,
        min_zoom=1,
        max_zoom=16,
        zoom_start=6,
        tiles="OpenStreetMap",
        height=400,
        width=600,
        control_scale=True
        )

    # add a temperature layer that a user can choose to overlay on map or not
    # the layer is gotten by making a call to the openweather tile API
    temperature = TileLayer(
        name='Temperature',
        tiles = "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid={}".format(api_key),
        min_zoom=1,
        max_zoom=18,
        max_native_zoom=16,
        overlay=True,
        attr= "<a href=https://openweathermap.org/api/weather-map-1h#layers/>OpenWeatherMap</a>",
        # opacity=0.99,
        )
    
    # add a precipitation layer that a user can choose to overlay on map or not
    precipitation = TileLayer(
        name='Rain',
        tiles = "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={}".format(api_key),
        min_zoom=1,
        max_zoom=18,
        max_native_zoom=16,
        overlay = True,
        attr= "<a href=https://openweathermap.org/api/weather-map-1h#layers/>OpenWeatherMap</a>",
        # opacity=0.99,
        )
    # add marker for specific city
    Marker(location=center,
        tooltip='Double Click to Zoom').add_to(base_map)

    # add tilelayers to map
    temperature.add_to(base_map)
    precipitation.add_to(base_map)
    TileLayer('Stamen Terrain').add_to(base_map)
    
    # add layer control and assign position
    LayerControl(   ).add_to(base_map)
    # HeatMap([city_temp]).add_to(base_map)
    base_map = base_map._repr_html_()
    

    return base_map

def index(request):
    ''' Function to get the city from the openweathermap api and return the weather of the given city.
    The function takes in the request and then calls the CityForm form with user input, checks validity of the form,
    whether the city exists, whether the city has already been returned and then returns information that is displayed
    to the user. 
    Input: request ie whether to get data or post based on user action
    Returns: weather information about the given city the user entered
    '''

    url = 'http://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid={}'


    err_msg = ''
    message = ''
    message_class = ''

    if request.method == 'POST':
        form = CityForm(request.POST)
        
        # if form is valid, create new city and count the occurrences in the database
        if form.is_valid():
            new_city = form.cleaned_data['name'].lower()
            existing_city_count = City.objects.filter(name=new_city).count()
            
            # if city has not been added to the database, the call the api and get city info otherwise error message
            if existing_city_count == 0:
                req = requests.get(url.format(new_city)).json()
                
                # check if the city is a valid city given the json object returned above
                if req['cod'] == 200:
                    form.save()
                else:
                    err_msg = 'Hmm...it seems like the city you entered is invalid, Please check your entry and try again'
            else:
                err_msg = 'This city already exists. Please enter a new city'

       
        # categorize the message class to return to user for html rendering
        if err_msg:
            message = err_msg
            message_class = 'is-danger'
        else:
            message = 'The city has been added successfully!'
            message_class = 'is-success'
        
         # redirect to the index to prevent form from resubmitting
        # return redirect('home')
        

    form = CityForm()

    # get all the cities in the database
    cities = City.objects.all()

    # initiate empty list to store all the weather data. 
    weather_data = []

    # loop through all the cities from database that user added and add relevant wweather information to list
    # reverse the list so that the last city to be added is shown first.
    for city in reversed(cities):

        req = requests.get(url.format(city, api_key)).json()
        if req == 500:
            # need to inspect the structure of the returned json to determine where each value lies
            city_weather = {
                'city' : city.name.title(),
                'temperature' : req['main']['temp'],
                'description' : req['weather'][0]['description'],
                'icon' : req['weather'][0]['icon'],
                'wind_speed' : req['wind']['speed'],
                'coordinates': (req['coord']['lat'], req['coord']['lon']),
            }

            # add the map object to list of eeather data: use coordinates and temperature from above
            city_weather['show_map'] = show_weather_map(city_weather['coordinates'], city_weather['temperature'])
        
            weather_data.append(city_weather)
        else:
            # city_weather = {'city')}
            weather_data.append(["Please wait For API to load"])
    # determine what will be displayed to the user: weather info, the empty form, the message and class
    context = {
        'weather_data' : weather_data, 
        'form' : form,
        'message' : message,
        'message_class' : message_class,
        # 'city_map': show_weather_map(city_weather['coordinates']),
    }

    # render the output in the html page found in the templates
    return render(request, 'get_weather/base.html', context)

def delete_city(request, city_name):
    '''Function to delete a city name from the database and return the user to the home page'''
    City.objects.get(name=city_name).delete()
    
    return redirect('home')


