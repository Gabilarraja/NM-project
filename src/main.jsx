import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './home.jsx'
import LoginPage from './LoginPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
   <MainPage />
  </BrowserRouter>  
  </React.StrictMode>
)
