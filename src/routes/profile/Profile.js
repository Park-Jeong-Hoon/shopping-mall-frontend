import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageSpinner from "../../components/PageSpinner";
import { Header } from "../../components/styles/Header";
import { InfoTable, Main, MainForLoading } from "../../components/styles/Main";

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
        }).catch(error => {});
    }

    useEffect(() => {
        getProfile();
    }, [isLoading])

    const CommaFormat = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Container>
            <Header>내정보</Header>
            {
                isLoading === false ?
                    <Main>
                        <InfoTable>
                            <thead>
                                <tr>
                                    <th>아이디</th>
                                    <th>{profileInfo.username}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>이름</td>
                                    <td>{profileInfo.name}</td>
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
                                <tr>
                                    <td>판매수익</td>
                                    <td>{`${CommaFormat(profileInfo.revenue)}\\`}</td>
                                </tr>
                            </tbody>
                        </InfoTable>
                        <Button onClick={() => { navigate("/profile-edit") }}>프로필 수정</Button>
                    </Main> : <MainForLoading><PageSpinner /></MainForLoading>
            }
        </Container>
    )
}

export default Profile;