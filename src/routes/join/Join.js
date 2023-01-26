import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Spinner } from "react-bootstrap";
import Header from "../../components/Header";

function Join({ isLogin }) {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const doJoin = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios(
            {
                url: '/member/join',
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    username: e.target[0].value,
                    password: e.target[1].value,
                    name: e.target[2].value,
                    phone: e.target[3].value,
                    email: e.target[4].value,
                    address: {
                        region: e.target[5].value,
                        road: e.target[6].value,
                        home: e.target[7].value,
                        zipcode: e.target[8].value
                    }
                }
            }
        ).then(function (response) {
            if (response.data === 'success') {
                setLoading(false);
                navigate("/login");
            } else {
                setLoading(false);
                alert("다시 시도해주세요");
            }
        }).catch(error => console.error('Error:', error));
    }

    return (
        <>
            <Header title={'회원가입'} />
            <Container>
                {
                    isLogin ?
                        <Navigate to={"/"} /> :
                        <Form onSubmit={doJoin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="text" placeholder="아이디" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="text" placeholder="이름" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>휴대번호</Form.Label>
                                <Form.Control type="text" placeholder="휴대번호" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>이메일</Form.Label>
                                <Form.Control type="text" placeholder="이메일" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>주소(지역)</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>주소(도로명)</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>주소(상세주소)</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>우편번호</Form.Label>
                                <Form.Control type="text" />
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
                                        {" 회원가입..."}
                                    </Button> :
                                    <Button variant="primary" type="submit">
                                        회원가입
                                    </Button>
                            }
                        </Form>
                }
            </Container>
        </>
    )
}

export default Join;