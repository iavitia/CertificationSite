import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
