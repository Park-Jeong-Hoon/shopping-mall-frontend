import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Join({ isLogin, setLogin }) {

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
        <div>
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
                        <Button variant="primary" type="submit">
                            회원가입
                        </Button>
                    </Form>
            }
        </div>
    )
}

export default Join;