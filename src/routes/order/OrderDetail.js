import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function OrderDetail() {
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
                                    <th>{orderInfo[0].itemName}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>가격</td>
                                    <td>{orderInfo[0].price}원</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th>수량</th>
                                    <th>{orderInfo[0].quantity}</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th>주문상태</th>
                                    <th>{orderInfo[0].orderStatus}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>총액</td>
                                    <td>{orderInfo[0].totalPrice}원</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>주문날짜</td>
                                    <td>{orderInfo[0].orderDate}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    : null
            }
        </div>
    )
}

export default OrderDetail;