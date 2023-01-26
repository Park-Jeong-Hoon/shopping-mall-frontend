import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Header from "../../components/Header";

function ItemAdd({ isLogin, setLogin }) {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const addItem = async (e) => {

        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("json",
            new Blob([
                JSON.stringify(
                    {
                        "name": e.target[0].value,
                        "price": e.target[1].value,
                        "stockQuantity": e.target[2].value
                    }
                )], { type: "application/json" })
        )

        await axios(
            {
                url: '/item/add',
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData
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
            navigate("/items");
        }).catch(error => console.error('Error:', error));
    }

    return (
        isLogin ?
            <>
                <Header title={'제품등록'} />
                <Container>
                    <Form onSubmit={addItem}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>제품명</Form.Label>
                            <Form.Control type="text" placeholder="상품의 이름을 적어주세요." required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>금액</Form.Label>
                            <Form.Control type="number" placeholder="상품의 금액을 적어주세요" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>수량</Form.Label>
                            <Form.Control type="number" placeholder="상품의 수량을 적어주세요" required />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>제품사진</Form.Label>
                            <Form.Control type="file" onChange={handleChangeFile} required />
                        </Form.Group>
                        {
                            isLoading ?
                                <Button variant="primary" disabled>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {" 등록신청..."}
                                </Button> :
                                <Button variant="primary" type="submit">
                                    등록신청
                                </Button>
                        }
                    </Form>
                </Container>
            </> : <Navigate to={"/"} />
    )
}

export default ItemAdd;