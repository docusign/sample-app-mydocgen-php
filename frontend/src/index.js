import React from 'react';
import 'bootstrap';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import './i18n';
import App from './App';
import { api } from './api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={api}>
        <App />
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
