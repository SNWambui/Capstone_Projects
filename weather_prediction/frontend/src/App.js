import './App.css';
import React, { useEffect, useState, useReducer } from "react";
// import Weather from './components/weather';
import LineChart from "./components/LineChart"
import AddCity from "./components/AddCity"
import { Data } from './Data';

export default function App() {

  // state to store the data from the API call
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
  const [city, setCity] = useState('')

const initialState = {labels: ''};
// const [state, dispatch] = useReducer(reducer, initialState);



  
  const getWeather = async (city) => {
    if(!city){
      console.log("Add City")
      return
    }
      console.log("This is e", city.city)

      setCity(city)
      // note that city returns a dictionary and so need to query city.city to get the actual city name. 
      const res = await fetch(`${process.env.REACT_APP_API_URL}/forecast/?q=${city.city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      const data = await res.json()
      setData(data)
    }

    useEffect(() => {
      getWeather()
    }, [city])

        // the code below is inspired by: https://github.com/lakshyajit165/weatherapp/blob/master/src/App.js
  // useEffect hook is important to ensure that there is no
  useEffect(()=> {
    let labs = [];
    let temps = [];
    let hums = [];
    if(city){
    if(!data.list){
      console.log("Unable to get weather info! Please check city you entered")
      // return <div> Loading...</div?
        // setError("Unable to get weather info! Please check city you entered")
    }else{
        
        let dt; 
        for(let i = 0; i<data.list.length; i++){
          dt = data.list[i];
          let date_ = dt.dt_txt.split(' ')[0];
        
            if(!labs.includes(date_) && dt.dt_txt.split(' ')[1] === '12:00:00'){
              // labels.push(date_);
              labs.push(dt.dt_txt.split(' ')[0]);
              temp_max.push(dt.main['temp_max']);
              temps.push(dt.main['temp']);
              hums.push(dt.main['humidity']);
              wind.push(dt.wind['speed']);
            }
        
      }
  
      if(labels.length !== temperature.length){
        labels.shift();
      }
    }
  }
   
    const newWeather = {
      labels: labs,
      datasets: [{
        label: "Temperature",
        data: temps,
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
        data: hums,
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
     
    }
    setWeatherData(oldWeather => ({...oldWeather, ...newWeather}));

  }, [data.list, labels, temp_max, temperature, humidity, wind, city])
  
  
  // console.log("This is weather data", Object.keys(weatherData).length);
  // console.log("this is data", data.list[0])
// /console.log("This is weather", typeof(weatherData))


  return (
    <div className="App">
      <AddCity onAdd={getWeather}/>
      {city ? 
      <div style={{ width: 700 }}>
      <LineChart chartData={weatherData} city ={city.city}/>
      </div> : <div></div>
      }
       <div style={{ width: 700 }}>
       <Data/>
       </div>
      
      <div>
        <button type="button" className='btn btn-block'>Get 6 month Forecast</button>
      </div>

    </div>
  );
}