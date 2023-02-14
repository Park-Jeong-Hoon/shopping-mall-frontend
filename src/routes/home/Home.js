import { Container } from "react-bootstrap";
import { Header } from "../../components/styles/Header";
import { Main } from "../../components/styles/Main";

function Home({ isLogin, setLogin }) {

    return (
        <Container>
            <Header>온라인쇼핑물</Header>
            <Main>
                <div>
                    로그인시 제품등록, 제품주문, 제품장바구니 가능
                </div>
                <div>
                    로그아웃상태에선 제품목록, 제품상세보기, 제품검색 가능
                </div>
            </Main>
        </Container>
    )
}

export default Home;