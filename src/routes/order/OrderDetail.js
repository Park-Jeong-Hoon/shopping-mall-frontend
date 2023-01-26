import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import OrderDetailCard from "./OrderDetailCard";

function OrderDetail({ isLogin, setLogin }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [orderInfo, setOrderInfo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getItem = async () => {
        await axios(
            {
                url: `/order/${id}`,
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
            setOrderInfo(response.data);
        }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getItem();
    }, [isLoading])

    const cancelOrder = async () => {
        setLoading(true);
        await axios(
            {
                url: `/order/cancel`,
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                data: orderInfo[0].orderId
            }
        ).then(function (response) {
            let jwtHeader = response.headers.get("Authorization")
            let jwtToken = '';
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
        }).catch(error => console.error('Error:', error));
    }

    return (
        isLogin ?
            <>
                <Header title={"주문상세"} />
                <Container>
                    {
                        isLoading === false ?
                            <div>
                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>{orderInfo[0].orderId}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>주문상태</th>
                                            <th>{orderInfo[0].orderStatus}</th>
                                        </tr>
                                        <tr>
                                            <td>총액</td>
                                            <td>{orderInfo[0].totalPrice}원</td>
                                        </tr>
                                        <tr>
                                            <td>주문날짜</td>
                                            <td>{orderInfo[0].orderDate}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                {
                                    orderInfo.map(function (o) {
                                        return (
                                            <OrderDetailCard orderItemInfo={o} />
                                        );
                                    })
                                }
                                {
                                    orderInfo[0].orderStatus === "CANCEL" ? null :
                                        <Button variant={"danger"} onClick={() => { cancelOrder() }}>주문 취소</Button>
                                }
                            </div>
                            : null
                    }
                </Container>
            </> : <Navigate to={"/"} />
    )
}

export default OrderDetail;