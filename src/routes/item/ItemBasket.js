import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ItemBasketInfo from "./ItemBasketInfo";

function ItemBasket() {

    const navigate = useNavigate();
    const [basket, setBasket] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getBasket = async () => {
        await axios(
            {
                url: '/item/basket',
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
            setBasket(response.data);
            setLoading(false);
        }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getBasket();
    }, [])

    return (
        <>
            <Header title={'장바구니목록'} />
            <Container>
                {
                    isLoading === false ?
                        <>
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>제품명</th>
                                        <th>금액</th>
                                        <th>재고</th>
                                        <th>결제</th>
                                        <th>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {basket.map(function (b) {
                                        return (
                                            <ItemBasketInfo key={b.id} itemInfo={b} />
                                        );
                                    })}
                                </tbody>
                            </Table>
                            <Button variant="primary" onClick={() => { navigate("/orders/payment", { state: { itemList: basket } }) }}>
                                전체결제
                            </Button>
                        </> : null
                }
            </Container>
        </>
    )
}

export default ItemBasket;