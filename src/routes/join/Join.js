import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Container, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import { Form, Main } from "../../components/styles/Main";

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
        <Container>
            <Header title={'회원가입'} />
            {
                isLogin ?
                    <Navigate to={"/"} /> :
                    <Main>
                        <Form onSubmit={doJoin}>
                            <div>
                                <label htmlFor="id">아이디</label>
                                <input id="id" type="text" placeholder="아이디" />
                            </div>
                            <div>
                                <label htmlFor="password">비밀번호</label>
                                <input id="password" type="password" placeholder="비밀번호" />
                            </div>
                            <div>
                                <label htmlFor="name">이름</label>
                                <input id="name" type="text" placeholder="이름" />
                            </div>
                            <div>
                                <label htmlFor="phone">휴대번호</label>
                                <input id="phone" type="text" placeholder="휴대번호" />
                            </div>
                            <div>
                                <label htmlFor="email">이메일</label>
                                <input id="email" type="text" placeholder="이메일" />
                            </div>
                            <div>
                                <label htmlFor="region">주소(지역)</label>
                                <input id="region" type="text" placeholder="주소(지역)" />
                            </div>
                            <div>
                                <label htmlFor="road">주소(도로명)</label>
                                <input id="road" type="text" placeholder="주소(도로명)" />
                            </div>
                            <div>
                                <label htmlFor="home">주소(상세주소)</label>
                                <input id="home" type="text" placeholder="주소(상세주소)" />
                            </div>
                            <div>
                                <label htmlFor="zipcode">우편번호</label>
                                <input id="zipcode" type="text" placeholder="우편번호" />
                            </div>
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
                    </Main>
            }
        </Container>
    )
}

export default Join;