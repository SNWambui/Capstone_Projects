/* 
This component gets historical data from a CSV loaded locally and displays it
on a click of a button and selection of a given year
The improvement to this is using a paid weather API to get historical data
given the year and city name from the form in the AddCity component. 
*/

import csvFile from '/Users/stevedavieswambui/Desktop/Capstone_projects/Different_Apps/weather_prediction/frontend/src/components/data_sources/kenya-climate-data-1991-2016-temp-degress-celcius.csv'
import Papa from "papaparse";
import { useEffect, useState } from 'react';
import Select from 'react-select'
import {Line} from "react-chartjs-2"
// // need this to display chart data in React
import {Chart as ChartJS} from "chart.js/auto";
import LineChart from './LineChart';

export const HistoricalData = ({props}) => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  // state to store chart data , years
  const [tempData, setTempData] = useState({})

  const [years, setYears] = useState([]);


  const getHistory = () =>{
    if(!csvFile){
      console.log("Add file")
    }
    Papa.parse(csvFile, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
  
        // Iterating data to get column name and their values
        results.data.map((d) => {
          // rowsArray.push(Object.keys(d));
          return valuesArray.push(Object.values(d));
      });
  
        // Parsed Data Response in array format
        setParsedData(results.data);
  
       
        // setValues(oldValue => ({...oldValue, ...valuesArray}));
        
        let label = [];
        let temperature = [];
        let year = [];
        if(!valuesArray){
          console.log("no values")
        }else{
        
        for(let i = 0; i<valuesArray.length; i++){
      
          // if(!labels.includes(date_) && dt.dt_txt.split(' ')[1] === '12:00:00'){
              // labels.push(date_);
          year.push(valuesArray[i][0]);
          label.push(valuesArray[i][1]);
          temperature.push(valuesArray[i][2]);
        }}
        // 
        console.log('this is year', year)
        // setTemperature(temperature);
        // setLabels(labels);
        const newTemp = {
          labels:  label,
          datasets: [{
            label: "temperature",
            data: temperature,
          }],
          borderWidth: 2,
        }
        // set the temperature data
        setTempData(oldTemp => ({...oldTemp, ...newTemp}))

         // Filtered Values
        setYears(oldYear => ({...oldYear, ...year}));

      },
    });
  }

  var dropLabels = [...new Set(Object.values(years))]
  var optionsList = [];

  dropLabels.forEach(function(elem){
    optionsList.push({label:elem, value:elem})
  })

  const allYears = tempData
  const getYearHistory = (year) =>{
    const allYears = getHistory()
    return JSON.stringify(allYears)
  }
  
  // to use when pulling data from API
  // useEffect(() => {
  //   getHistory();
  // }, [])

  // getHistoricalWeather Data
  // - default is 2022
  // - year == '2022'
  // - dropdown: select year 
  // - if year === year, show the average for that year

  return(
    <div>
    <button type="button" className='btn btn-block' onClick={getHistory}>Get Historical Weather</button>
    {/* {console.log("this is new years", [...new Set(Object.keys(years).map(key => years[key]))])} */}
    {/* {console.log("this is all years", {allYears})} */}
    <Select options={optionsList}/>
    {Object.keys(tempData).length>1 ? <Line data={tempData}/> : <div></div>}
  </div>
  )
}
// fs.readFile(csvFile, 'utf8', function (err, data) {
//   if (err) {
//       throw err;
//   }
//   Papa.parse(data, {
//    step: function (row) {
//     console.log("Row:", row.data);
//    }
//  });
// });