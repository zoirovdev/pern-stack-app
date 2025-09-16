import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import your main App component
import './index.css'; // Import global styles (optional)
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);