import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

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
        <>
            <Header title={"내정보 수정"} />
            <Container>
                {
                    isLogin === false ?
                        <Navigate to={"/"} /> :
                        isLoading ?
                            <div></div> :
                            <Form onSubmit={doEdit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>아이디</Form.Label>
                                    <Form.Control type="text" defaultValue={profileInfo.username} readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>이름</Form.Label>
                                    <Form.Control type="text" defaultValue={profileInfo.name} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>이메일</Form.Label>
                                    <Form.Control type="text" defaultValue={profileInfo.email} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>휴대폰 번호</Form.Label>
                                    <Form.Control type="text" defaultValue={profileInfo.phone} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>주소(지역)</Form.Label>
                                    <Form.Control type="text" defaultValue={profileInfo.address.region} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>주소(도로명)</Form.Label>
                                    <Form.Control type="text" defaultValue={profileInfo.address.road} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>주소(상세주소)</Form.Label>
                                    <Form.Control type="text" defaultValue={profileInfo.address.home} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>우편번호</Form.Label>
                                    <Form.Control type="text" defaultValue={profileInfo.address.zipcode} />
                                </Form.Group>
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
                }
            </Container>
        </>
    )
}

export default ProfileEdit;