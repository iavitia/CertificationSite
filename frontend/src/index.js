import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'
import { AppProvider } from './context/appContext'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
