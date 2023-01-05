import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";


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

    return (
        <div>
            <h1>주문목록</h1>
            {
                isLoading === false ?
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>주문상태</th>
                                <th>금액</th>
                                <th>주문날짜</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(function (o) {
                                return (
                                    <tr>
                                        <td>{o.orderStatus}</td>
                                        <td>{o.price}</td>
                                        <td>{o.orderDate}</td>
                                        <td><Link to={`/orders/${o.id}`}>상세보기</Link></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table> : null
            }
        </div>
    )
}

export default OrderList;