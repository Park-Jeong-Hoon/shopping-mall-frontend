import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Spinner } from 'react-bootstrap';
import { InfoTable, Main, MainForLoading } from '../../components/styles/Main';
import PageSpinner from '../../components/PageSpinner';
import { Header } from '../../components/styles/Header';

function ItemDetail({ isLogin, setLogin }) {

    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isBasketLoading, setBasketLoading] = useState(false);

    const getItem = async () => {
        await axios(
            {
                url: `/item/${id}`,
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
            setItem(response.data);
        }).catch(error => {});
    }

    const keepItem = async (id) => {
        setBasketLoading(true);
        await axios(
            {
                url: `/item/keep`,
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                data: id
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
            setBasketLoading(false);
        }).catch(error => {});
    }

    useEffect(() => {
        getItem();
    }, [])

    const CommaFormat = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Container>
            <Header>제품상세</Header>
            {
                isLoading === false ?
                    <Main>
                        <InfoTable>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{item.id}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>제품명</td>
                                    <td>{item.name}</td>
                                </tr>
                                <tr>
                                    <td>가격</td>
                                    <td>{`${CommaFormat(item.price)}\\`}</td>
                                </tr>
                                <tr>
                                    <td>재고</td>
                                    <td>{item.stockQuantity}</td>
                                </tr>
                                <tr>
                                    <td>이미지</td>
                                    <td>
                                        <img src={`${item.imageName}`}
                                            style={{ width: "200px", height: "150px" }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>판매자</td>
                                    <td>{item.username}</td>
                                </tr>
                            </tbody>
                        </InfoTable>
                        {
                            isLogin ?
                                <div>
                                    <Button onClick={() => {
                                        navigate("/orders/payment", {
                                            state: {
                                                itemList: [item]
                                            }
                                        })
                                    }}>주문하기</Button>{' '}
                                    {
                                        isBasketLoading ?
                                            <Button variant="secondary" disabled>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                {" 장바구니담기..."}
                                            </Button> :
                                            <Button variant='secondary' onClick={() => {
                                                keepItem(item.id);
                                            }}>장바구니담기</Button>
                                    }
                                </div> : null
                        }

                    </Main>
                    : <MainForLoading><PageSpinner /></MainForLoading>
            }
        </Container>
    )
}

export default ItemDetail;