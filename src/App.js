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
import ItemBasket from './routes/item/ItemBasket';
import OrderList from './routes/order/OrderList';
import OrderDetail from './routes/order/OrderDetail';
import OrderPayment from './routes/order/OrderPayment';
import Profile from './routes/profile/Profile';
import ProfileEdit from './routes/profile/ProfileEdit';
import axios from 'axios';
import { ThemeProvider } from 'react-bootstrap';

function App() {

  const [isLogin, setLogin] = useState(false);
  const [isAppLoad, setAppLoad] = useState(false);
  const [memberName, setMemberName] = useState({});

  const getMemberName = async () => {
    await axios(
      {
        url: '/member/name',
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
        setMemberName(response.data);
        setAppLoad(true);
      } else {
        setAppLoad(true);
      }
    }).catch(error => {
      console.error('Error:', error);
      setAppLoad(true);
    });
  }

  useEffect(() => {
    getMemberName();
  }, [])

  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
      <BrowserRouter>
        <div className="App">
          <Navigator memberName={memberName} isLogin={isLogin} setLogin={setLogin} />
          {
            isAppLoad ?
              <Routes>
                <Route path='/' element={<Home isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/join' element={<Join isLogin={isLogin} />} />
                <Route path='/login' element={<Login isLogin={isLogin} setLogin={setLogin} setMemberName={setMemberName} />} />
                <Route path='/items' element={<ItemList isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/items/search/:name' element={<ItemList isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/items/:id' element={<ItemDetail isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/items/add' element={<ItemAdd isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/basket' element={<ItemBasket isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/orders' element={<OrderList isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/orders/:id' element={<OrderDetail isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/orders/payment' element={<OrderPayment isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/profile' element={<Profile isLogin={isLogin} setLogin={setLogin} />} />
                <Route path='/profile-edit' element={<ProfileEdit isLogin={isLogin} setLogin={setLogin} />} />
              </Routes> : <div></div>
          }
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
