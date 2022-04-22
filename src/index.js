import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { DatabaseProvider } from './providers/DatabaseProvider';
import { MainRouter } from './router/router';

import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DatabaseProvider>
        <MainRouter />
      </DatabaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
