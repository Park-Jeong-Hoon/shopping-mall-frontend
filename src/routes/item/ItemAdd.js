import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function ItemAdd({ isLogin, setLogin }) {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const addItem = async (e) => {

        e.preventDefault();
        setLoading(true);
        await axios(
            {
                url: '/item/add',
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    "name": e.target[0].value,
                    "price": e.target[1].value,
                    "stockQuantity": e.target[2].value
                }
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
            navigate("/items");
        }).catch(error => console.error('Error:', error));
    }

    return (
        <Form onSubmit={addItem}>
            <h2>제품등록</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>제품명</Form.Label>
                <Form.Control type="text" placeholder="상품의 이름을 적어주세요." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>금액</Form.Label>
                <Form.Control type="number" placeholder="상품의 금액을 적어주세요" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>수량</Form.Label>
                <Form.Control type="number" placeholder="상품의 수량을 적어주세요" />
            </Form.Group>
            <Button variant="primary" type="submit">
                등록신청
            </Button>
        </Form>
    )
}

export default ItemAdd;