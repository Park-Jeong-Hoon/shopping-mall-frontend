import { Container } from "react-bootstrap";
import { HeaderStyle } from "./styles/HeaderStyle";

function Header({ title }) {
    return (
        <HeaderStyle>{title}</HeaderStyle>
    )
}

export default Header;