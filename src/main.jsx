import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createModes } from './modes.js';
import { SYMBOLS } from './symbols.js';
import './App.css';

// Composition root: the concrete modes, bots and images are chosen here and passed down.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App modes={createModes()} symbols={SYMBOLS} />
  </React.StrictMode>
);
