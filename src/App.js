import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './routes/home/Home';
import Join from './routes/join/Join';
import Login from './routes/login/Login';
import axios from 'axios';

function App() {

  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const getAccessToken = async () => {
    await axios(
      {
        url: '/member/hello',
        method: 'get',
        baseURL: `${process.env.REACT_APP_BACKEND}`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(function (response) {
      let jwtHeader = response.headers.get("Authorization")
      let jwtToken = '';
      if (jwtHeader !== undefined) {
        if (jwtHeader.startsWith('Bearer ')) {
          jwtToken = jwtHeader.replace('Bearer ', '');
        }
        setLogin(true);
        setAccessToken(jwtToken);
      }
      
    }).catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    getAccessToken();
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home isLogin={isLogin} setLogin={setLogin} accessToken={accessToken} />} />
          <Route path='join' element={<Join isLogin={isLogin} setLogin={setLogin} />} />
          <Route path='login' element={<Login isLogin={isLogin} setLogin={setLogin} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
