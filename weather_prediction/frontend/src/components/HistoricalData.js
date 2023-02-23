/* 
This component gets historical data from a CSV loaded locally and displays it
on a click of a button and selection of a given year
The improvement to this is using a paid weather API to get historical data
given the year and city name from the form in the AddCity component. 
*/

// import csvFile from 'https://tinyurl.com/weather-data1'
import csvFile from "./../Kenya-climate-1990-2021.csv"
import Papa from "papaparse";
import React, {useEffect, useState } from 'react';
import Select from 'react-select'
import {Line} from "react-chartjs-2"
// // need this to display chart data in React
import {Chart as ChartJS} from "chart.js/auto";
import LineChart from './LineChart';

export const HistoricalData = ({props}) => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  // state to store chart data , years
  const [weatherData, setWeatherData] = useState({})

  const [years, setYears] = useState([]);
  const [filterYear, setFilterYear] = useState({label:'2021', value:'2021'})

  const [chart, toggleChart] = useState(false)


  const getHistory = () =>{
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
  
        let year = [];
        if(!valuesArray){
          console.log("no values")
        }else{
        
        for(let i = 0; i<valuesArray.length; i++){
          year.push(valuesArray[i][0]);
        }}

         // Filtered Values
        setYears(oldYear => ({...oldYear, ...year}));

      },
    });
  }

  const handleClick = () => {
    if(!chart){
      toggleChart(true)
    }

  }

  const filterHistory = (targetYear) =>{
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
  
        // Parsed Data Response in array format
        setParsedData(results.data);

        let label = [];
        let temperature = [];
        let rainfall = [];
        let year = [];
        if(!valuesArray){
          console.log("no values")
        }else if(!targetYear){
          console.log('No year')
        }
        else{
        
        for(let i = 0; i<valuesArray.length; i++){
          if(valuesArray[i][0]===Object.values(targetYear)[0]){
            year.push(valuesArray[i][0]);
            label.push(valuesArray[i][1]);
            temperature.push(valuesArray[i][2]);
            rainfall.push(valuesArray[i][3]);
          }
        }}
        console.log("this is valuesArrray",)
        
        // variable to store the weather data
        const newWeather = {
          labels:  label,
          datasets: [{
            label: "Temperature",
            data: temperature,
            borderColor: 'rgba(255, 0, 0, 1)', // set border color
            backgroundColor: 'rgb(255, 99, 132)', // set background color
          },
          {
            label: "Rainfall",
            data: rainfall,
            backgroundColor: 'rgba(135,206,235,1)', 
            borderColor: 'rgba(135,206,235,1)',
          }],
          borderWidth: 2,
        }
        // set the temperature data
        setWeatherData(oldWeather => ({...oldWeather, ...newWeather}))

         // Filtered Values
        // setYears(oldYear => ({...oldYear, ...year}));
        getHistory()

      },
    });
  }

  // get the lables and create a list to store the options
  var dropLabels = [...new Set(Object.values(years))]
  var optionsList = [];

  // loop throough all the labels and create a dict for options for select
  dropLabels.forEach(function(elem){
    optionsList.push({label:elem, value:elem})
  })

  const allYears = weatherData
  useEffect(() => {
    
    // filter and update chart data
    filterHistory(filterYear)

  }, [filterYear] );
  // to use when pulling data from API
  // useEffect(() => {
  //   getHistory();
  // }, [])
  
  return(
    <div>
      <Select
        options={optionsList} 
        defaultValue={{ label: "Select Year For History", value: 0 }} 
        onChange = {(choice) => {
        setFilterYear(choice)
      }}/>
    <button 
      type="button" 
      className='btn btn-block' 
      onClick={handleClick}>Get Historical Weather
    </button>
    {chart && (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flex: 4 }}>
          <Line data={weatherData}
            options={{
            plugins: {
                title: {
                    display: true,
                    align: 'center',
                    text: `Historical Weather For ${Object.values(filterYear)[0]}`,
                    fontSize: 20,
                }
            },
            maintainAspectRatio: true,
            duration: 2000
            }} />
            </div>
          <div style={{ flex: 1, textAlign: 'left', fontSize:15  }}>
            The historical data only ranges from 1991 to 2021. More recent weather data
            will be included upon availability. 
            <div>
              Similar to above, if you want to zoom in on temperature, click on 'rainfall' to hide it
            </div>
          </div>
        </div>
    )}
    
    {/* {filterYear?<Line data={weatherData}/> : <div></div>}} */}
    {/* {weatherData ? <Line data={weatherData}/> : <div></div>} */}
  </div>
  )
  
  

}