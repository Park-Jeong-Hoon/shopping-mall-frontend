import axios from "axios";
import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import { useState } from "react";

function Login({ isLogin, setLogin, setMemberName }) {

    const [isLoading, setLoading] = useState(false);

    const doLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios(
            {
                url: '/member/login',
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    username: e.target[0].value,
                    password: e.target[1].value
                }
            }
        ).then(function (response) {
            console.log(response.data);
            if (response.data.result === "success") {
                let jwtHeader = response.headers.get("Authorization")
                let jwtToken = '';
                if (jwtHeader.startsWith('Bearer ')) {
                    jwtToken = jwtHeader.replace('Bearer ', '');
                }
                setLogin(true);
                setLoading(false);
                setMemberName(response.data.name);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${jwtToken}`;
            } else {
                alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
        }).catch(error => console.error('Error:', error));
    }

    return (
        <>
            <Header title={'로그인'} />
            <Container>
                {
                    isLogin ?
                        <Navigate to={"/"} /> :
                        <Form onSubmit={doLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="text" placeholder="아이디" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호" />
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
                                        {" 로그인..."}
                                    </Button> :
                                    <Button variant="primary" type="submit">
                                        로그인
                                    </Button>
                            }
                        </Form>
                }
            </Container>
        </>
    )
}

export default Login;