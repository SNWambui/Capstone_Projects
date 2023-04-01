/*
This component renders the application in index.html so that it is accessible on web
*/


import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// updated way of rendering root
const root = createRoot(document.getElementById("root"))
root.render(<React.StrictMode><App/></React.StrictMode>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
