import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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
                    <form onSubmit={doJoin}>
                        <input type={"text"} placeholder={"아이디"} required />
                        <input type={"password"} placeholder={"비밀번호"} required />
                        <input type={"name"} placeholder={"이름"} required/>
                        <input type={"phone"} placeholder={"휴대번호"} required/>
                        <input type={"email"} placeholder={"이메일"} required/>
                        <input type={"submit"} value={"회원가입"} />
                    </form>
            }
        </div>
    )
}

export default Join;