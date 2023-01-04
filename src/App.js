import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigator from './components/Navigator';
import Home from './routes/home/Home';
import Join from './routes/join/Join';
import Login from './routes/login/Login';
import ItemList from './routes/item/ItemList';
import ItemDetail from './routes/item/ItemDetail';
import ItemAdd from './routes/item/ItemAdd';
import OrderList from './routes/order/OrderList';
import OrderPayment from './routes/order/OrderPayment';
import axios from 'axios';
import { ThemeProvider } from 'react-bootstrap';

function App() {

  const [isLogin, setLogin] = useState(false);
  const [profile, setProfile] = useState({});

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
        setProfile(response.data);
      }
    }).catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
      <BrowserRouter>
        <div className="App">
          {
            isLogin ?
              <Navigator profile={profile} setLogin={setLogin} /> : null
          }
          <Routes>
            <Route path='/' element={<Home isLogin={isLogin} setLogin={setLogin} />} />
            <Route path='/join' element={<Join isLogin={isLogin} setLogin={setLogin} />} />
            <Route path='/login' element={<Login isLogin={isLogin} setLogin={setLogin} />} />
            <Route path='/items' element={<ItemList isLogin={isLogin} setLogin={setLogin} />} />
            <Route path='/items/add' element={<ItemAdd isLogin={isLogin} setLogin={setLogin} />} />
            <Route path='/items/:id' element={<ItemDetail isLogin={isLogin} setLogin={setLogin} />} />
            <Route path='/orders' element={<OrderList isLogin={isLogin} setLogin={setLogin} />} />
            <Route path='/orders/payment' element={<OrderPayment isLogin={isLogin} setLogin={setLogin} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
