import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigator from './components/Navigator';
import Home from './routes/home/Home';
import Join from './routes/join/Join';
import Login from './routes/login/Login';
import ItemList from './routes/item/ItemList';
import OrderList from './routes/order/OrderList';
import axios from 'axios';

function App() {

  const [isLogin, setLogin] = useState(false);

  const getProfile = async () => {
    await axios(
      {
        url: '/member/profile',
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
      console.log(response);
      if (jwtHeader !== undefined) {
        if (jwtHeader.startsWith('Bearer ')) {
          jwtToken = jwtHeader.replace('Bearer ', '');
        }
        setLogin(true);
        console.log(jwtToken)
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${jwtToken}`;
      }
    }).catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {
          isLogin ?
            <Navigator /> : null
        }
        <Routes>
          <Route path='/' element={<Home isLogin={isLogin} setLogin={setLogin} />} />
          <Route path='join' element={<Join isLogin={isLogin} setLogin={setLogin} />} />
          <Route path='login' element={<Login isLogin={isLogin} setLogin={setLogin} />} />
          <Route path='items' element={<ItemList isLogin={isLogin} setLogin={setLogin} />} />
          <Route path='orders' element={<OrderList isLogin={isLogin} setLogin={setLogin} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
