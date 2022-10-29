# About Farmer Weather

## Overview
Farmer Weather is a django app that displays the weather of a given city on a map. The goal is to add a visual representation of weather data given that people who can access this app probably already have weather apps on their phones. The map allows users to zoom in and out of the city they entered which might allow them to see how the weather varies across different cities.

Additionally, users can choose how to view the map that is whehter it is terrain, or street, whether to see both rain and temperature or one or none. The default is that rain and temperature are overlaid on the map but the user can choose not to. 

## How to run the app locally
Navigate to a desired project directory and clone the repository:<br>
`git clone https://github.com/SNWambui/Capstone_Projects/tree/main/farmer_weather`

Create a virtual environment:<br>
`python3 -m venv django`
`source django/bin/activate`

All the requirements for the project are stored in the requirements.txt file. To install them run:<br>
`pip3 install -r requirements.txt`

Create an .env file in the root directory and store anything that was gotten from this project's .env file. Generate and store you new secret key and database credentials. You can use `Djecrety` to generate a secure secret key. It's good practice to create a .env file to store sensitive information and then add this file to a .gitignore file so that the info is not uploaded to github.

Make migrations from scratch. Note that you will generate a local sqlite database but can choose to connect a local postgreSQL database.<br>
`$ python manage.py makemigrations`
`$ python manage.py migrate`

Create a new superuser:<br>
`python manage.py runserver`

Start the development and check that there are no errors:<br>
`python manage.py runserver`

Here is a screenshot of what the web app should look like after a city has been entered[](Get_weather_image.jpeg)


