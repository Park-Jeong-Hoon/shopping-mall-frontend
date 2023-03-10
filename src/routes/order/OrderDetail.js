import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import PageSpinner from "../../components/PageSpinner";
import { Header } from "../../components/styles/Header";
import { InfoTable, Main, MainForLoading } from "../../components/styles/Main";
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
        }).catch(error => {});
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
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${jwtToken}`;
            }
            setLoading(false);
        }).catch(error => {});
    }

    const CommaFormat = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        isLogin ?
            <Container>
                <Header>????????????</Header>
                {
                    isLoading === false ?
                        <Main>
                            <InfoTable>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{orderInfo[0].orderId}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>????????????</td>
                                        <td>{orderInfo[0].orderStatus === "ORDER" ? "????????????" : orderInfo[0].orderStatus === "CANCEL" ? "????????????" : "??????????????????"}</td>
                                    </tr>
                                    <tr>
                                        <td>??????</td>
                                        <td>{`${CommaFormat(orderInfo[0].totalPrice)}\\`}</td>
                                    </tr>
                                    <tr>
                                        <td>????????????</td>
                                        <td>{`${orderInfo[0].orderDate.split('T')[0]} ${orderInfo[0].orderDate.split('T')[1]}`}</td>
                                    </tr>
                                    <tr>
                                        <td>????????????</td>
                                        <td>{orderInfo[0].deliveryStatus === "READY" ? "?????????" : orderInfo[0].deliveryStatus === "START" ? "????????????" : "????????????"}</td>
                                    </tr>
                                    <tr>
                                        <td>?????????</td>
                                        <td>{`${orderInfo[0].address.region} ${orderInfo[0].address.road} ${orderInfo[0].address.home}`}</td>
                                    </tr>
                                </tbody>
                            </InfoTable>
                            <div className="line"></div>
                            {
                                orderInfo.map(function (o) {
                                    return (
                                        <OrderDetailCard orderItemInfo={o} CommaFormat={CommaFormat} />
                                    );
                                })
                            }
                            {
                                orderInfo[0].orderStatus === "CANCEL" ? null :
                                    <Button variant={"danger"} onClick={() => { cancelOrder() }}>?????? ??????</Button>
                            }
                        </Main>
                        : <MainForLoading><PageSpinner /></MainForLoading>
                }
            </Container> : <Navigate to={"/"} />
    )
}

export default OrderDetail;