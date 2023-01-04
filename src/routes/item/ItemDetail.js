import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

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
            setItem(response.data);
        }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getItem();
    }, [])

    return (
        <div>
            <h1>제품상세</h1>
            <hr />
            {
                isLoading === false ?
                    <div>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>제품</th>
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
                        }}>주문하기</Button>
                    </div>
                    : null
            }
        </div>
    )
}

export default ItemDetail;