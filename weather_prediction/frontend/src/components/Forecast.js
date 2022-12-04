/* */

import csvFile from '/Users/stevedavieswambui/Desktop/Capstone_projects/Different_Apps/weather_prediction/frontend/src/components/data_sources/kenya-climate-data-1991-2016-temp-degress-celcius.csv'
import Papa from "papaparse";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as settings from '../settings';
import {Line} from "react-chartjs-2"
// import city from '../App';
// import App from '../App';

function Forecast() {

  // state var to store the predictions
  const [forecast, setForecast] = useState({});

  // state var to store csv data
  const [csvData, setCsvData] = useState();

  // state to store chart data , years
  const [weatherData, setWeatherData] = useState({})

  //get historical data
  const getData = () =>{
    if(!csvFile){
      console.log("Add file")
    }
    Papa.parse(csvFile, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
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
      }

// function to send data to the prediction REST API
const getForecast = () =>{
  getData()
     //Axios variables required to call the prediction API
        // let headers = { 'Authorization': `Token ${props.token}` };
        let url = settings.API_SERVER + '/api/predict/';
        let method = 'POST';
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
            label: "temperature",
            data: tempForecast,
            borderColor: 'rgb(255, 99, 132)',
          },
          {
            label: "Rainfall",
            data: rainForecast,
          }],
          borderWidth: 2,
        }
        // set the temperature data
        setWeatherData(oldWeather => ({...oldWeather, ...newWeather}))
          
        
        })
          .catch(
                error => {alert(error)})
}

// useEffect(() => {
//   getForecast();
// }, [])
// const handleClick = () =>{
//   if(!csvFile){
//     console.log("No data")
//   }
//   else{
//     getForecast()
//   }
// }

// console.log("This is forecast",csvData)


  return (
    <div>
        <button type="button" className='btn btn-block' onClick={getForecast}>Get 12 month Forecast</button>
        {/* {console.log("This is forecast",JSON.parse(forecast['data']).temp)} */}
        {console.log("This is forecast length", Object.keys(weatherData).length)}
       
    {Object.keys(weatherData).length > 1? 
    <Line data={weatherData}
     options={{
      plugins: {
          title: {
              display: true,
              align: 'center',
              text: '12 Month Weather Forecast For 2017',
              fontSize: 20,
          }
      }
      // maintainAspectRatio: true,
      // duration: 2000
      }} />
      : <div></div>}
   
      </div>

    
  )
}

export default Forecast