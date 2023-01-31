import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navigator({ memberName, isLogin, setLogin }) {

    const navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        await axios(
            {
                url: '/member/logout',
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(function (response) {
            if (response.data === "logout") {
                setLogin(false);
            } else {
                alert("다시 시도해주세요");
            }
        }).catch(error => console.error('Error:', error));
    }
    
    const searchItem = async (e) => {
        e.preventDefault();
        navigate(`/items/search/${e.target[0].value}`)
        
    }

    return (
        <Navbar bg="light" varient="light" expand="lg">
            <Container>
                <Navbar.Brand href="/" onClick={(e) => { e.preventDefault(); navigate("/") }}>홈</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end" onSelect={(selectedKey) => navigate(`/${selectedKey}`)}>
                        <Nav.Link eventKey="items">제품목록</Nav.Link>
                        <Nav.Link eventKey="items/add">제품등록</Nav.Link>
                        <Nav.Link eventKey="orders">주문목록</Nav.Link>
                        <Nav.Link eventKey="basket">장바구니</Nav.Link>
                        {
                            isLogin ?
                                <NavDropdown title={`${memberName}님`} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => { navigate("/profile") }}>회원정보</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
                                </NavDropdown> :
                                <>
                                    <Nav.Link eventKey="login">로그인</Nav.Link>
                                    <Nav.Link eventKey="join">회원가입</Nav.Link>
                                </>
                        }
                    </Nav>
                    <Form className="d-flex" onSubmit={searchItem}>
                        <Form.Control
                            type="search"
                            placeholder="제품검색"
                            className="me-1"
                            aria-label="Search"
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigator;