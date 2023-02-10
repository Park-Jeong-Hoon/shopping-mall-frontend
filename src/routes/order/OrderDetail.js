import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import PageSpinner from "../../components/PageSpinner";
import { Main, MainForLoading, Table } from "../../components/styles/Main";
import OrderDetailCard from "./OrderDetailCard";

function OrderDetail({ isLogin, setLogin }) {

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
            if (jwtHeader !== undefined) {
                if (jwtHeader.startsWith('Bearer ')) {
                    jwtToken = jwtHeader.replace('Bearer ', '');
                }
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

    const CommaFormat = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        isLogin ?
            <>
                <Header title={"주문상세"} />
                <Container>
                    {
                        isLoading === false ?
                            <Main>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>{orderInfo[0].orderId}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>주문상태</td>
                                            <td>{orderInfo[0].orderStatus === "ORDER" ? "주문완료" : orderInfo[0].orderStatus === "CANCEL" ? "주문취소" : "부분주문취소"}</td>
                                        </tr>
                                        <tr>
                                            <td>총액</td>
                                            <td>{CommaFormat(orderInfo[0].totalPrice)}원</td>
                                        </tr>
                                        <tr>
                                            <td>주문날짜</td>
                                            <td>{`${orderInfo[0].orderDate.split('T')[0]} ${orderInfo[0].orderDate.split('T')[1]}`}</td>
                                        </tr>
                                        <tr>
                                            <td>배송상태</td>
                                            <td>{orderInfo[0].deliveryStatus === "READY" ? "준비중" : orderInfo[0].deliveryStatus === "START" ? "배송시작" : "배송완료"}</td>
                                        </tr>
                                        <tr>
                                            <td>배송지</td>
                                            <td>{`${orderInfo[0].address.region} ${orderInfo[0].address.road} ${orderInfo[0].address.home}`}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                {
                                    orderInfo.map(function (o) {
                                        return (
                                            <OrderDetailCard orderItemInfo={o} CommaFormat={CommaFormat} />
                                        );
                                    })
                                }
                                {
                                    orderInfo[0].orderStatus === "CANCEL" ? null :
                                        <Button variant={"danger"} onClick={() => { cancelOrder() }}>주문 취소</Button>
                                }
                            </Main>
                            : <MainForLoading><PageSpinner /></MainForLoading>
                    }
                </Container>
            </> : <Navigate to={"/"} />
    )
}

export default OrderDetail;