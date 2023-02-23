/*
Component to implmenent the fetch request to get weather forecast from
openweatherApi and that is store in weatherData state and passed to linechart
for 5 day weather forcast 
*/

// import React, { useEffect, useState, useReducer } from "react";
// import LineChart from "./LineChart";
// import AddCity from "./AddCity";

// function WeekForecast() {
//     const [forecast, setForecast] = useState(false);
//     const [error, setError] = useState('');
  
//     // state to store the data from the API call
//     const [data, setData] = useState([]);
//     const [weatherData, setWeatherData] = useState({undefined})
//     const [city, setCity] = useState('')
    
//     // get the forecast for the given city
//     const getWeather = async (city) => {
//       if(!city){
//         console.log("Add City")
//         return
//       }
//         // console.log("This is e", city.city)
  
//         setCity(city)
//         // note that city returns a dictionary and so need to query city.city to get the actual city name. 
//         const res = await fetch(`${process.env.REACT_APP_API_URL}/forecast/?q=${city.city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
//         const data = await res.json()
//         setData(data)
//       }
  
//       useEffect(() => {
//         getWeather()
//       }, [city])
  
//           // the code below is inspired by: https://github.com/lakshyajit165/weatherapp/blob/master/src/App.js
//     // useEffect hook is important to ensure that there is no infinte renders
//     useEffect(()=> {
//       let labels = [];
//       let temperature = [];
//       let humidity = [];
//       let dt;
//       if(city){
//         if(!data.list){
//           console.log("Unable to get weather info! Please check city you entered")
//           // return <div> Loading...</div>
//             // setError("Unable to get weather info! Please check city you entered")
//         }else{
//             for(let i = 0; i<data.list.length; i++){
//               dt = data.list[i];
//               let date_ = dt.dt_txt.split(' ')[0];
            
//                 if(!labels.includes(date_) && dt.dt_txt.split(' ')[1] === '12:00:00'){
//                   labels.push(dt.dt_txt.split(' ')[0]);
                  
//                   temperature.push(dt.main['temp']);
//                   humidity.push(dt.main['humidity']);
//                   // wind.push(dt.wind['speed']);
//                   // temp_max.push(dt.main['temp_max']);
//                 }
          
//         }
    
//         if(labels.length !== temperature.length){
//           labels.shift();
//         }
//       }
//     }
      
//       // store the weather data in chartjs format and then set the state
//       const newWeather = {
//         labels: labels,
//         datasets: [{
//           label: "Temperature (C)",
//           data: temperature,
//           borderColor: 'rgba(255, 0, 0, 1)', // set border color
//           backgroundColor: 'rgb(255, 99, 132)', // set background color
//         },
//         {
//           label: "Humidity (mm)",
//           data: humidity,
//           borderColor: "#2a71d0",
//           backgroundColor: [
//             "#f3ba2f",
//             "#ecf0f1",
//             "#50AF95",
//             "#ffbb11",
//             "#2a71d0"
//           ],
//         },
//         ],
//         borderWidth: 2,
       
//       }
//       setWeatherData(oldWeather => ({...oldWeather, ...newWeather}));
  
//     }, [data.list, city])
import React, { useEffect, useState, useReducer } from "react";
import LineChart from "./LineChart";
import AddCity from "./AddCity";

function WeekForecast() {
    const [forecast, setForecast] = useState(false);
    const [error, setError] = useState('');
  
    // state to store the data from the API call
    const [data, setData] = useState([]);
    const [weatherData, setWeatherData] = useState({undefined})
    const [city, setCity] = useState('')
    
    // get the forecast for the given city
    const getWeather = async (city) => {
      if(!city){
        console.log("Add City")
        // setError("Please Add A City")
        return
      }
  
      setCity(city)
      setError(''); // clear any previous error messages
      
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/forecast/?q=${city.city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        const data = await res.json()
        setData(data)
      } catch (e) {
        console.error(e);
        setError('Unable to get weather info! Please check city you entered');
      }
      // setError(''); // clear any previous error messages
    }
  
    useEffect(() => {
      getWeather()
    }, [city])
  
    useEffect(()=> {
      let labels = [];
      let temperature = [];
      let humidity = [];
      let dt;
      if(city){
        if(!data.list){
          setError("Hmm...it seems like the city you entered is invalid, Please check your entry and try again")
        } else {
          setError("");
          for(let i = 0; i<data.list.length; i++){
            dt = data.list[i];
            let date_ = dt.dt_txt.split(' ')[0];
            
            if(!labels.includes(date_) && dt.dt_txt.split(' ')[1] === '12:00:00'){
              labels.push(dt.dt_txt.split(' ')[0]);
              temperature.push(dt.main['temp']);
              humidity.push(dt.main['humidity']);
            }
          }
    
          if(labels.length !== temperature.length){
            labels.shift();
          }
        }
      }
      
      // store the weather data in chartjs format and then set the state
      const newWeather = {
        labels: labels,
        datasets: [{
          label: "Temperature (C)",
          data: temperature,
          borderColor: 'rgba(255, 0, 0, 1)', // set border color
          backgroundColor: 'rgb(255, 99, 132)', // set background color
        },
        {
          label: "Humidity (mm)",
          data: humidity,
          borderColor: "#2a71d0",
          backgroundColor: [
            "#f3ba2f",
            "#ecf0f1",
            "#50AF95",
            "#ffbb11",
            "#2a71d0"
          ],
        },
        ],
        borderWidth: 2,
      }
      
      setWeatherData(oldWeather => ({...oldWeather, ...newWeather}));
      // setError(''); // clear any previous error messages
    }, [data.list, city])

    return (
        <div>
            {/* <div style={{fontSize: 13}}> */}
          
            {/* </div> */}
            <AddCity onAdd={getWeather}/>
            <div>
              {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
            {city &&(
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                <div style={{ flex: 1, textAlign: 'left', fontSize:15 }}>
                  You can hover on the chart to see the exact values for each day. 
                  
                  If you want to zoom in on Humidity, click on 'Temperature' to hide it.
                </div>
                <div  style={{ flex: 4 }}>
                <LineChart 
                  chartData={weatherData} 
                  city ={city.city}
                  />
                </div>
              </div>
            )
           
            }
        </div>
  )
}

export default WeekForecast