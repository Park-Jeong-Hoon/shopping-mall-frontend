import { Link } from "react-router-dom";
import axios from 'axios';
import { Container } from "react-bootstrap";

function Home({ isLogin, setLogin }) {

    const getHello = async () => {
        await axios(
            {
                url: '/member/hello',
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
                setLogin(true);
                console.log(jwtToken)
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${jwtToken}`;
            }
        }).catch(error => console.error('Error:', error));
    }

    return (
        <Container>
            <div>홈페이지</div>
            {
                isLogin ?
                    <div>
                        <button onClick={() => { getHello(); }}>테스트</button></div> :
                    <div>
                        <div><Link to={"/login"}>로그인</Link></div>
                        <div><Link to={"/join"}>회원가입</Link></div>
                    </div>

            }
        </Container>
    )
}

export default Home;