import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'
// Context
import { AppProvider } from './context/appContext'
import { CollapseDrawerProvider } from './context/CollapseDrawerContext'
// Scroll bar
import 'simplebar/src/simplebar.css'

// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <HelmetProvider>
        <CollapseDrawerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CollapseDrawerProvider>
      </HelmetProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
