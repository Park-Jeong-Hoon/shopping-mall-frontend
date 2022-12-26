import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './routes/home/Home';
import Join from './routes/join/Join';
import Login from './routes/login/Login';

function App() {
  
  const [isLogin, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home isLogin={isLogin} setLogin={setLogin} />} />
          <Route path='join' element={<Join isLogin={isLogin} setLogin={setLogin} />} />
          <Route path='login' element={<Login isLogin={isLogin} setLogin={setLogin} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
