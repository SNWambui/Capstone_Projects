import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Prediction from './components/Prediction';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/login/" element = {<Login/>}/>
        <Route path="/home/" element = {<Prediction/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
