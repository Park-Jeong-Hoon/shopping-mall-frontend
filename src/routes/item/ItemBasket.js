import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import PageSpinner from "../../components/PageSpinner";
import { Header } from "../../components/styles/Header";
import { Main, MainForLoading } from "../../components/styles/Main";
import ItemCard from "./ItemCard";

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
            <Container>
                <Header>장바구니목록</Header>
                {
                    isLoading === false ?
                        <Main>
                            {
                                basket.length > 0 ?
                                    <>
                                        <div className='item-container'>
                                            {

                                                basket.map(function (b) {
                                                    return (
                                                        <ItemCard key={b.id} itemInfo={b} setDeleteLoading={setDeleteLoading} />
                                                    );
                                                })
                                            }
                                        </div>
                                        <Button variant="primary" style={{ "width": "100px", "marginTop": "20px" }} onClick={() => { navigate("/orders/payment", { state: { itemList: basket } }) }}>
                                            전체결제
                                        </Button>
                                    </> :
                                    <div>장바구니로 등록한 제품이 없습니다.</div>
                            }
                        </Main> :
                        <MainForLoading>
                            <PageSpinner />
                        </MainForLoading>
                }
            </Container> : <Navigate to={"/"} />
    )
}

export default ItemBasket;