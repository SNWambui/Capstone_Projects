# About Weather Prediction

## Overview
This is a React and FASTAPI app that:
1. Allows users to create an account and log in to access the prediction interface. In the current version, I haven’t implemented signing up and will do so in the next iteration. 
2. Provides the predicted annual yield of a crop give the type of soil they applied manure to. In the prediction interface, the user enters values for a few conditions necessary for the growth of the selected crop and they get a predicition of what is the anticipated yield given the conditions. The form input labels specify the min and max values as well as the units of the various conditions. I use FASTAPI to load pickeled models that generate prediction based on form data sent from the frontend. The API then sends the prediction back to the frontend and displays the result in text format
-  In the current version, I haven't implemented logic to display predicted based on selected crop: the current output is predicted yield for beans in normal soil. This logic will be implemented in the next iteration.


## How to run the app locally


Here is a screenshot of what the web app should look like ![](Crop_Decision.jpeg)

## Release Notes
