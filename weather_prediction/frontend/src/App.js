// import "./App.css"
// import React, {useState, useEffect} from 'react'
// import LineChart from "./components/LineChart"
// import {UserData} from "./Data"
// import AddCity from "./components/AddCity"
// import Cities from './components/Cities'

// function App() {
//     // const [lat, setLat] = useState([]);
//     // const [long, setLong] = useState([]);   
//     // const [data, setData] = useState([]);
//     const [city, setCity] = useState([]);
//     useEffect(() => {
//         const fetchData = async () => {

//             //const response = await fetch(`${process.env.REACT_APP_API_URL}/weather/?q=${nyeri}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/weather/?q=nyeri&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
//             const json = await response.json();
//             setCity(json);
//             console.log(json)
//         }
//         fetchData();
//     }, []);
//     const [userData, setUserData] = useState({
//       labels: UserData.map((data) => data.year),
//       datasets: [
//         {
//           label: "Users Gained",
//           data: UserData.map((data) => data.userGain),
//           backgroundColor: [
//             "rgba(75,192,192,1)",
//             "#ecf0f1",
//             "#50AF95",
//             "#f3ba2f",
//             "#2a71d0",
//           ],
//           borderColor: "black",
//           borderWidth: 2,
//         },
//       ],
//     });
//     return (
//     <div className="App">
//         {/* <AddCity onAdd={city}/> */}
//         <LineChart chartData={userData}/>
//         <LineChart chartData={city}/>
//     </div>
    
    
//   )
// }

// export default App;
import './App.css';
import React, { useEffect, useState } from "react";
// import Weather from './components/weather';
import LineChart from "./components/LineChart"
import AddCity from "./components/AddCity"

export default function App() {


  const [data, setData] = useState([]);
  const [weather, setWeather] = useState({});
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [forecast, setForecast] = useState(false);
  const [wind, setWind] = useState([]);
  const [labels, setLabel] = useState([]);
  const [error, setError] = useState('');
  const [dt, setDt] = useState([]);
  const [temp_max, setTempMax] = useState([]);
  const [weatherData, setWeatherData] = useState({undefined})
  //console.log("This is data:", data)


  const getWeather = async (city) => {
      // note that city returns a dictionary and so need to query city.city to get the actual city name. 
      const res = await fetch(`${process.env.REACT_APP_API_URL}/forecast/?q=${city.city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      const data = await res.json()
      setData(data)
      // console.log("this is label", labels)
      setWeatherData({
        labels: labels,
        datasets: [{
          label: "Temperature",
          data: temperature,
          backgroundColor: [
            "#ffbb11",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0"
          ],
        },
        {
          label: "Humidity",
          // data: data.list[0].main.humidity,
          data: humidity,
          backgroundColor: [
            "#f3ba2f",
            "#50AF95",
            "#ffbb11",
            "#2a71d0",
            "#ecf0f1"
          ],
        },
        ],
        borderWidth: 2,
       
      });
    }

    useEffect(() => {
      getWeather()
    }, [])

        // the code below is inspired by: https://github.com/lakshyajit165/weatherapp/blob/master/src/App.js
  if(!data.list){
    // console.log("Unable to get weather info! Please check city you entered")
      setError("Unable to get weather info! Please check city you entered")
  }else{
      // let labels = [];
      // let temperature = [];
      // let humidity = [];
      // let wind = [];
      let dt; 
      for(let i = 0; i<data.list.length; i++){
        dt = data.list[i];
        let date_ = dt.dt_txt.split(' ')[0];
        // console.log("This is date", date_)
      
          if(!labels.includes(date_) && dt.dt_txt.split(' ')[1] === '12:00:00'){
            // console.log(dt.dt_txt.split(' ')[1]);
            // labels.push(date_);
            labels.push(dt.dt_txt.split(' ')[0]);
            console.log("This is date", labels)
            temp_max.push(dt.main['temp_max']);
            temperature.push(dt.main['temp']);
            humidity.push(dt.main['humidity']);
            wind.push(dt.wind['speed']);
          }
      
    }

    if(labels.length !== temperature.length){
      labels.shift();
    }
  }
 
  // console.log("This is rain", labels)

  // console.log(weatherData);
  // console.log(labels);
  // console.log(temp_max);
  // console.log(hum);
  // console.log(wind_speed);

  console.log("This is weather data", Object.keys(weatherData).length);
  // console.log("this is data", data.list[0])
  return (
    <div className="App">
      <AddCity onAdd={getWeather}/>
      {Object.keys(weatherData).length>1 &&  
      <div style={{ width: 700 }}>
      <LineChart chartData={weatherData}/>
      </div>
      }

    </div>
  );
}