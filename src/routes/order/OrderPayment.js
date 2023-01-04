import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function OrderPayment() {

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
                data: [
                    {
                        "id": itemList[0].id,
                        "quantity": e.target[2].value
                    }
                ]
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
            navigate("/orders");
        }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        setItemList(location.state.itemList);
    }, []);

    const calculatePrice = (e) => {
        setTotalPrice(e.target.value * itemList[0].price);
    }

    return (
        <Form onSubmit={doOrder}>
            <h2>주문결제</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>상품명</Form.Label>
                <Form.Control type="text" defaultValue={itemList.length !== 0 ? itemList[0].name : ''} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>금액</Form.Label>
                <Form.Control type="number" defaultValue={itemList.length !== 0 ? itemList[0].price : ''} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={calculatePrice}>
                <Form.Label>수량</Form.Label>
                <Form.Control type="number" placeholder="상품의 수량을 적어주세요" />
                <Form.Text>
                    {`수량이 재고보다 많을 경우 주문이 이뤄지지 않습니다.`}
                </Form.Text>
            </Form.Group>
            <h3>{`총액: ${totalPrice}`}</h3>
            <Button variant="primary" type="submit">
                결제하기
            </Button>
        </Form>
    )
}

export default OrderPayment;