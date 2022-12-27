import { Link } from "react-router-dom";

function Home({ isLogin, setLogin }) {
    return (
        <div>
            <div>홈페이지</div>
            {
                isLogin ?
                    <div>로그아웃</div> :
                    <div>
                        <div><Link to={"/login"}>로그인</Link></div>
                        <div><Link to={"/join"}>회원가입</Link></div>
                    </div>

            }
        </div>

    )
}

export default Home;