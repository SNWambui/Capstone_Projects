import React from 'react'
// import line component from chartjs
import {Line} from "react-chartjs-2"
// need this to display chart data in React
import {Chart as ChartJS} from "chart.js/auto";

// define chartData as props then add it to App.js
const LineChart = ({chartData}) =>{
    return <Line data={chartData} />;
}

export default LineChart;