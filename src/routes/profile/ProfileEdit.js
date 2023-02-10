import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PageSpinner from "../../components/PageSpinner";
import { Form, Main, MainForLoading } from "../../components/styles/Main";

function ProfileEdit({ isLogin, setLogin }) {

    const [isLoading, setLoading] = useState(true);
    const [isSaveLoading, setSaveLoading] = useState(false);
    const [profileInfo, setProfileInfo] = useState(null);
    const navigate = useNavigate();

    const getProfile = async () => {
        await axios(
            {
                url: `/member/profile`,
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
            setProfileInfo(response.data);
        }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getProfile();
    }, [isLoading])

    const doEdit = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        await axios(
            {
                url: `/member/profile/edit`,
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    username: e.target[0].value,
                    name: e.target[1].value,
                    email: e.target[2].value,
                    phone: e.target[3].value,
                    address: {
                        region: e.target[4].value,
                        road: e.target[5].value,
                        home: e.target[6].value,
                        zipcode: e.target[7].value
                    }
                }
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
            if (response.data === "success") {
                setProfileInfo(response.data);
                navigate("/profile")
            }
            setSaveLoading(false);
        }).catch(error => console.error('Error:', error));
    }

    return (
        <Container>
            <Header title={"내정보 수정"} />
            {
                isLogin === false ?
                    <Navigate to={"/"} /> :
                    isLoading ?
                        <MainForLoading><PageSpinner /></MainForLoading> :
                        <Main>
                            <Form onSubmit={doEdit}>
                                <div>
                                    <label htmlFor="id">아이디</label>
                                    <input id="id" type="text" defaultValue={profileInfo.username} readOnly />
                                </div>
                                <div>
                                    <label htmlFor="name">이름</label>
                                    <input id="name" type="text" defaultValue={profileInfo.name} />
                                </div>
                                <div>
                                    <label htmlFor="email">이메일</label>
                                    <input id="email" type="text" defaultValue={profileInfo.email} />
                                </div>
                                <div>
                                    <label htmlFor="phone">휴대번호</label>
                                    <input id="phone" type="text" defaultValue={profileInfo.phone} />
                                </div>
                                <div>
                                    <label htmlFor="region">주소(지역)</label>
                                    <input id="region" type="text" defaultValue={profileInfo.address.region} />
                                </div>
                                <div>
                                    <label htmlFor="road">주소(도로명)</label>
                                    <input id="road" type="text" defaultValue={profileInfo.address.road} />
                                </div>
                                <div>
                                    <label htmlFor="home">주소(상세주소)</label>
                                    <input id="home" type="text" defaultValue={profileInfo.address.home} />
                                </div>
                                <div>
                                    <label htmlFor="zipcode">우편번호</label>
                                    <input id="zipcode" type="text" defaultValue={profileInfo.address.zipcode} />
                                </div>
                                {
                                    isSaveLoading ?
                                        <Button variant="primary" disabled>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            {" 저장..."}
                                        </Button> :
                                        <Button variant="primary" type="submit">
                                            저장
                                        </Button>
                                }
                            </Form>
                        </Main>
            }
        </Container>
    )
}

export default ProfileEdit;