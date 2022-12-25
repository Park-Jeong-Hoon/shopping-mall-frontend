import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home/Home';
import Join from './routes/join/Join';
import Login from './routes/login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='join' element={<Join />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
