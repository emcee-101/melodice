import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/overview" element={<OverviewRoot />} />
      <Route path="/" element={<App />} />
    </BrowserRouter>
  </React.StrictMode>
);
*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);