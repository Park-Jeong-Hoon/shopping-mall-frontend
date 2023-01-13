import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import Header from "../../components/Header";

function ItemDetail({ isLogin, setLogin }) {

    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [isLoading, setLoading] = useState(true);

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
                console.log(jwtToken)
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${jwtToken}`;
            }
            setLoading(false);
            setItem(response.data);
        }).catch(error => console.error('Error:', error));
    }

    const keepItem = async (id) => {
        setLoading(true);
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
            setLoading(false);
        }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getItem();
    }, [])

    return (
        <>
            <Header title={'제품상세'} />
            <Container>
                <hr />
                {
                    isLoading === false ?
                        <div>
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{item.id}</th>
                                    </tr>
                                    <tr>
                                        <th>제품명</th>
                                        <th>{item.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>가격</td>
                                        <td>{item.price}</td>
                                    </tr>
                                    <tr>
                                        <td>재고</td>
                                        <td>{item.stockQuantity}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Button onClick={() => {
                                navigate("/orders/payment", {
                                    state: {
                                        itemList: [item]
                                    }
                                })
                            }}>주문하기</Button>{' '}
                            <Button variant='secondary' onClick={() => {
                                keepItem(item.id);
                            }}>장바구니담기</Button>
                        </div>
                        : null
                }
            </Container>
        </>
    )
}

export default ItemDetail;