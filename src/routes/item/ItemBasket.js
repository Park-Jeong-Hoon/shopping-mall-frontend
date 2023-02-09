import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import { Main, MainForLoading, Table } from "../../components/styles/Main";
import ItemBasketInfo from "./ItemBasketInfo";

function ItemBasket({ isLogin, setLogin }) {

    const navigate = useNavigate();
    const [basket, setBasket] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isDeleteLoading, setDeleteLoading] = useState(false);

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
    }, [isDeleteLoading])

    return (
        isLogin ?
            <>
                <Header title={'장바구니목록'} />
                <Container>

                    {
                        isLoading === false ?
                            <Main>
                                <Table>
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
                                        {
                                            basket.length > 0 ?
                                                basket.map(function (b) {
                                                    return (
                                                        <ItemBasketInfo key={b.id} itemInfo={b} setDeleteLoading={setDeleteLoading} />
                                                    );
                                                }) :
                                                <tr>
                                                    <td colSpan={6}>장바구니로 등록한 제품이 없습니다.</td>
                                                </tr>
                                        }
                                    </tbody>
                                </Table>
                                <Button variant="primary" style={{ "width": "100px", "marginTop": "20px" }} onClick={() => { navigate("/orders/payment", { state: { itemList: basket } }) }}>
                                    전체결제
                                </Button>
                            </Main> : 
                            <MainForLoading>
                                <Spinner />
                            </MainForLoading>
                    }
                </Container>
            </> : <Navigate to={"/"} />
    )
}

export default ItemBasket;