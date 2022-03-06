import './App.css';
import { Page404, Register, Login, Dashboard } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuestionNew from './pages/QuestionNew';
import ThemeConfig from './theme';

function App() {
  return (
    <div className="App">
      <ThemeConfig>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/study/new" element={<QuestionNew />} />
          </Routes>
        </BrowserRouter>
      </ThemeConfig>
    </div>
  );
}

export default App;
