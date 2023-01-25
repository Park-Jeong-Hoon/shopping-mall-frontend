import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function Profile({ isLogin, setLogin }) {

    const [isLoading, setLoading] = useState(true);
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
            console.log(response.data)
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
            setProfileInfo(response.data);
        }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getProfile();
    }, [isLoading])

    return (
        <>
            <Header title={"내정보"} />
            <Container>
                {
                    isLoading === false ?
                        <div>
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>아이디</th>
                                        <th>{profileInfo.username}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>이름</th>
                                        <th>{profileInfo.name}</th>
                                    </tr>
                                    <tr>
                                        <td>이메일</td>
                                        <td>{profileInfo.email}</td>
                                    </tr>
                                    <tr>
                                        <td>휴대폰번호</td>
                                        <td>{profileInfo.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>주소</td>
                                        <td>{`${profileInfo.address.region} ${profileInfo.address.road} ${profileInfo.address.home}`}</td>
                                    </tr>
                                    <tr>
                                        <td>우편번호</td>
                                        <td>{profileInfo.address.zipcode}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Button onClick={() => { navigate("/profile-edit") }}>프로필 수정</Button>
                        </div> : null
                }
            </Container>
        </>
    )
}

export default Profile;