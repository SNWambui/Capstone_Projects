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
      <div style={{ width: 700 }}>
       <WeekForecast/>
       </div>
       <div style={{ width: 700 }}>
       <HistoricalData/>
       </div>
       <div style={{ width: 700 }}>
       <Forecast/>
       </div>

    </div>
  );
}