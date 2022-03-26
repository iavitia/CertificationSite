import './App.css';
import Router from './routes';
import ThemeConfig from './theme';

function App() {
  return (
    <div className="App">
      <ThemeConfig>
        <Router />
      </ThemeConfig>
    </div>
  );
}

export default App;
