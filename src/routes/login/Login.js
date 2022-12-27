import axios from "axios";
import { Navigate } from "react-router-dom";

function Login({ isLogin, setLogin }) {

    const doLogin = async (e) => {
        e.preventDefault();
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
            let jwtHeader = response.headers.get("Authorization")
            let jwtToken = '';
            if (jwtHeader.startsWith('Bearer ')) {
                jwtToken = jwtHeader.replace('Bearer ', '');
            }
            setLogin(jwtToken);
        }).catch(error => console.error('Error:', error));
    }

    return (

        <div>
            {
                isLogin ?
                    <Navigate to={"/"} /> :
                    <form onSubmit={doLogin}>
                        <input type={"text"} placeholder={"아이디"} />
                        <input type={"password"} placeholder={"비밀번호"} />
                        <input type={"submit"} value={"로그인"} />
                    </form>
            }
        </div>
    )
}

export default Login;