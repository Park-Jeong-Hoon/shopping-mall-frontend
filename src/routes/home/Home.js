import { Link } from "react-router-dom";
import axios from 'axios';

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
                    // "Authorization" : ""
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
        <div>
            <div>홈페이지</div>
            {
                isLogin ?
                <div>

                    <div>로그아웃</div><button onClick={() => { getHello(); }}>테스트</button></div> :
                    <div>
                        <div><Link to={"/login"}>로그인</Link></div>
                        <div><Link to={"/join"}>회원가입</Link></div>
                        
                    </div>

            }
        </div>

    )
}

export default Home;