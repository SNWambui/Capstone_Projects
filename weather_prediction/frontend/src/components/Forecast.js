/*
Loads the csv file from the resources, prepares the data as a json, sends to the backend via post
then receives the prediction of the ANN model of weather for 12 months and plots the temperature
and rainfall prediction data. 
*/

// import csvFile from 'https://tinyurl.com/weather-data1'
import csvFile from "./../kenya-climate-data-1991-2016-temp-degress-celcius.csv"
import Papa from "papaparse";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as settings from '../settings';
import {Line} from "react-chartjs-2"
// import { setLabels } from "react-chartjs-2/dist/utils";

function Forecast() {

  // state var to store the predictions
  const [forecast, setForecast] = useState({});

  // state var to store csv data
  const [csvData, setCsvData] = useState();

  // state to store chart data , years
  const [weatherData, setWeatherData] = useState({})

  // state to store whether the model is loading or not
  const [loading, setLoading] = useState(false);

  // function to get historical data from csv
  // important to use async await and promise to ensure user gets data on first click
  async function getData() {
    return new Promise((resolve, reject) => {
      Papa.parse(csvFile, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          resolve(results.data);
            const valuesArray = [];
             // Iterating data to get column name and their values
            results.data.map((d) => {
            // rowsArray.push(Object.keys(d));
            return valuesArray.push(Object.values(d));
          });
          // Parsed Data Response in array format to pass to REsT API
          setCsvData(results.data);
        }
      });
    });
  }
  
// function to get predictions from model fed csv data above
// must be assynchronouse to allow sending csv data and getting post data for user
async function getForecast() {

  try {
    const csvData = await getData();
    setCsvData(csvData);

  //Axios variables required to call the prediction API
    let url = settings.API_SERVER + '/api/predict/';
    let method = 'POST';
    // console.log("this is the data", csvData)
    let config = { method, url, data: csvData };

    //Axios predict API call
    axios(config)
    .then((res) => {
      setForecast(res.data)
      // get the raina and temperature predictions
      let tempForecast =  Object.values(JSON.parse(res.data["data"]).temp_preds)
      let rainForecast =  Object.values(JSON.parse(res.data["data"]).rain_preds);

      // get string timestamp
      let timeStamp = Object.keys(JSON.parse(res.data["data"]).temp_preds);
      let years = [];
      
      for(let i=0; i<timeStamp.length; i++){
        var date = new Date(parseInt(timeStamp[i]))
        years.push((date.getFullYear()+1)+"-"+(date.getMonth()+1));
      } 

    // variable to store the weather data
    const newWeather = {
      labels:  years,
      datasets: [{
        label: "Temperature (C)",
        data: tempForecast,
        borderColor: 'rgba(255, 0, 0, 1)', // set border color
        backgroundColor: 'rgb(255, 99, 132)', // set background color
      },
      {
        label: "Rainfall (mm)",
        data: rainForecast,
        backgroundColor: 'rgba(135,206,235,1)', 
        borderColor: 'rgba(135,206,235,1)',
      }],
      borderWidth: 2,
    }
    // set the weather data
    setWeatherData(oldWeather => ({...oldWeather, ...newWeather}))
    
  }).catch 
    (error => {console.error(error)});
} catch (error) {
  console.error(error);
}}


  return (
    <div>
      <button type="button" className='btn btn-block' onClick={() => {
        getForecast()
        setLoading(true)
      }}>Get 12 month Forecast</button>
      {loading && <div style={{fontSize:15}}>Please wait up to 20 seconds for the 12 month Forecast</div>}
      {Object.keys(weatherData).length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flex: 1, textAlign: 'left', fontSize:15 }}>
            The chart only shows the prediction for 2017 because it is the only year
            that is not present in the data. The prediction will be updated with more data.
            </div>
          <div style={{ flex: 4 }}>
            <Line
              data={weatherData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    align: 'center',
                    text: `12 Month Weather Forecast For ${(weatherData.labels[0])}`,
                    fontSize: 20,
                  }
                  
                },
                maintainAspectRatio: true,
                duration: 2000
              }}
            />
          </div>
          
        </div>
      )}
    </div>
  );
  
}

export default Forecast