import csvFile from '/Users/stevedavieswambui/Desktop/Capstone_projects/Different_Apps/weather_prediction/frontend/src/components/data sources/kenya-climate-data-1991-2016-temp-degress-celcius.csv'
import Papa from "papaparse";
import { useEffect, useState, useCallback } from 'react';
import {Line} from "react-chartjs-2"
// // need this to display chart data in React
import {Chart as ChartJS} from "chart.js/auto";
import LineChart from './components/LineChart';

export const Data = ({props}) => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
 
  //State to store the values
  const [values, setValues] = useState([]);

  // state to store chart data , labels and weahter
  const [tempData, setTempData] = useState({})
  // const [temperature, setTemperature] = useState([]);
  // const [year, setYear] = useState([]);
  // const [labels, setLabels] = useState([]);

  
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
  
        // Filtered Column Names
        setTableRows(rowsArray[0]);
  
        // Filtered Values
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
        // setYear(year);
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
        setTempData(oldTemp => ({...oldTemp, ...newTemp}))

      },
    });
    console.log("This is values", tempData)
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


  // useEffect(()=> {

  // }, [values]);


  return(
    <div>
      {console.log(JSON.stringify(tempData))}
      {/* {console.log('this is parsed', JSON.stringify(tempData))} */}
    <button type="button" className='btn btn-block' onClick={getHistory}>Get Historical Weather</button>
    {Object.keys(tempData).length>1 ? <Line data={tempData}/> : <div>'No data'</div>}
    {/* {JSON.stringify(Object.keys(tempData).length>1)} */}
    {/* {Object.keys(tempData).length>1 &&
    <div style={{ width: 700 }}>
    <LineChart chartData={tempData}/> */}
    {/* </div>} */}
    {/* {tempData && <Line data={tempData}/>} */}
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