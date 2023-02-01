import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function OrderList({ isLogin, setLogin }) {

    const navigate = useNavigate();
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
            console.log(response);
            if (jwtHeader !== undefined) {
                if (jwtHeader.startsWith('Bearer ')) {
                    jwtToken = jwtHeader.replace('Bearer ', '');
                }
                console.log(jwtToken)
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${jwtToken}`;
            }
            setLoading(false);
            setOrders(response.data);
        }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getOrders();
    }, [])

    const CommaFormat = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        isLogin ?
            <>
                <Header title={'주문목록'} />
                <Container>
                    {
                        isLoading === false ?
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>주문상태</th>
                                        <th>금액</th>
                                        <th>주문날짜</th>
                                        <th>배송상태</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(function (o) {
                                        return (
                                            <tr>
                                                <td>{o.id}</td>
                                                <td>{o.orderStatus === "ORDER" ? "주문완료" : o.orderStatus === "CANCEL" ? "주문취소" : "부분주문취소"}</td>
                                                <td>{CommaFormat(o.price)}</td>
                                                <td>{`${o.orderDate.split('T')[0]} ${o.orderDate.split('T')[1]}`}</td>
                                                <td>{o.deliveryStatus === "READY" ? "준비중" : o.deliveryStatus === "START" ? "배송시작" : "배송완료"}</td>
                                                <td><Button size="sm" onClick={() => { navigate(`/orders/${o.id}`) }}>상세보기</Button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table> : null
                    }
                </Container>
            </> : <Navigate to={"/"} />
    )
}

export default OrderList;