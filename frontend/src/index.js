import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Clear any stale auth data on initial load
localStorage.clear();

const container = document.getElementById('root');
const rootElement = createRoot(container);

rootElement.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
