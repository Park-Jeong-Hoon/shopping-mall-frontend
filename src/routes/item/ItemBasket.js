import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Header from "../../components/Header";

function ItemBasket() {

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
            setBasket(response.data);
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
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>제품명</th>
                                    <th>금액</th>
                                    <th>재고</th>
                                </tr>
                            </thead>
                            <tbody>
                                {basket.map(function (b) {
                                    return (
                                        <tr>
                                            <td>{b.name}</td>
                                            <td>{b.price}</td>
                                            <td>{b.stockQuantity}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table> : null
                }
            </Container>
        </>
    )
}

export default ItemBasket;