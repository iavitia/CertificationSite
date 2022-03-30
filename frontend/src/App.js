import './App.css'
import Router from './routes'
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'

function App() {
  return (
    <div className="App">
      <ThemeConfig>
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </div>
  )
}

export default App
