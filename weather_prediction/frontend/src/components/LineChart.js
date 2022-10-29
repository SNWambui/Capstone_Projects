import React from 'react'
// import line component from chartjs
import {Line} from "react-chartjs-2"
// need this to display chart data in React
import {Chart as ChartJS} from "chart.js/auto";

// define chartData as props then add it to App.js
const LineChart = ({chartData, city}) =>{
    // c

    // if(chartData !== props.chartData)
    // if(chartData){
    console.log(chartData)
    // return <div>"cow"</div>
    return <Line data={chartData} 
    options={{
        plugins: {
            title: {
                display: true,
                align: 'center',
                text: `Weather Forecast for ${city}`
            }
        },
        maintainAspectRatio: true,
        duration: 2000
        }}  />;
    // return "Add data"
}

export default LineChart;