// import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

const rootElement = document.querySelector('div#root');
ReactDOM.createRoot(rootElement)
    .render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );