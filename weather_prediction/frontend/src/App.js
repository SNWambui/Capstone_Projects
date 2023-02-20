/*
This is the main app component where I import all other app components
*/
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HistoricalData } from './components/HistoricalData';
import Forecast from './components/Forecast';
import WeekForecast from './components/WeekForecast';
import Header from './components/Header';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <div className="App">
      {/* <NavBar/> */}
      <Header/>
      <div className='App-chart-container'>
       <WeekForecast/>
       </div>
       <div className='App-chart-container'>
       <HistoricalData/>
       </div>
       <div className='App-chart-container'>
       <Forecast/>
       </div>

    </div>
  );
}