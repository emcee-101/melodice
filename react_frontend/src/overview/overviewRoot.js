import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
import overview from 'overview.js'
import reportWebVitals from './reportWebVitals';


// Code is for when a parameter is passed in the url to view a certain song on the site
// still to be made flexible

var singleTrack, requestedTrackID 

requestedTrackID = ''
singleTrack = 2000

if(requestedTrackID == '') 
  singleTrack = 0 
else
  singleTrack = 1;




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <overview 
          singleTrack = {singleTrack}
          requestedTrackID = {requestedTrackID} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
