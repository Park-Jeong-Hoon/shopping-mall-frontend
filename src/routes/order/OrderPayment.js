import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/styles/Header";
import { Form, Main } from "../../components/styles/Main";
import OrderItemInfo from "./OrderItemInfo";

function OrderPayment({ isLogin, setLogin }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [itemList, setItemList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const doOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios(
            {
                url: '/order/add',
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                data: itemList
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
            navigate("/orders");
        }).catch(error => {});
    }

    useEffect(() => {
        if (location.state == null) {
            navigate("/");
            return;
        }
        let items = location.state.itemList;
        for (let i = 0; i < items.length; i++) {
            items[i].quantity = 0;
        }
        setItemList(items);
    }, []);

    const controlQuantity = (e, id) => {
        let findIndex = itemList.findIndex(item => item.id === id)
        let copiedItemList = [...itemList];
        copiedItemList[findIndex].quantity = e.target.value;

        setItemList(copiedItemList);

        let totalPrice = 0;
        for (let i = 0; i < copiedItemList.length; i++) {
            totalPrice += copiedItemList[i].price * copiedItemList[i].quantity;
        }
        setTotalPrice(totalPrice);
    }

    return (
        isLogin ?
            <Container>
                <Header>????????????</Header>
                <Main>
                    <Form onSubmit={doOrder}>
                        {itemList.map(function (itemInfo) {
                            return (
                                <OrderItemInfo key={itemInfo.id} itemInfo={itemInfo} controlQuantity={controlQuantity} />
                            );
                        })}

                        <h3>{`??????: ${totalPrice}`}</h3>
                        {
                            isLoading ?
                                <Button variant="primary" disabled>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {" ????????????..."}
                                </Button> :
                                <Button variant="primary" type="submit">
                                    ????????????
                                </Button>
                        }
                    </Form>
                </Main>
            </Container> : <Navigate to={"/"} />
    )
}

export default OrderPayment;