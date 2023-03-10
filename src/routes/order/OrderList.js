import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import PageSpinner from "../../components/PageSpinner";
import { Header } from "../../components/styles/Header";
import { Main, MainForLoading } from "../../components/styles/Main";
import OrderCard from "./OrderCard";

function OrderList({ isLogin, setLogin }) {

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getOrders = async () => {
        await axios(
            {
                url: '/order/all',
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
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${jwtToken}`;
            }
            setLoading(false);
            setOrders(response.data);
        }).catch(error => {});
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        isLogin ?
            <Container>
                <Header>주문목록</Header>
                {
                    isLoading === false ?
                        <Main>
                            {
                                orders.length !== 0 ?
                                    <div className="order-container">
                                        {
                                            orders.map(function (o) {
                                                return (
                                                    <OrderCard key={o.id} orderInfo={o} />
                                                );
                                            })
                                        }
                                    </div> : <div>주문내역이 없습니다.</div>
                            }
                        </Main> : <MainForLoading><PageSpinner /></MainForLoading>
                }
            </Container> : <Navigate to={"/"} />
    )
}

export default OrderList;