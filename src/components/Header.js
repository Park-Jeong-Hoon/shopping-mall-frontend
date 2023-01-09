import { Container } from "react-bootstrap";
import { HeaderStyle } from "./styles/HeaderStyle";

function Header({ title }) {
    return (
        <HeaderStyle>
            <Container>{title}</Container>
        </HeaderStyle>
    )
}

export default Header;