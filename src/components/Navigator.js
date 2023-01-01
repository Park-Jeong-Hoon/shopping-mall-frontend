import { Link } from "react-router-dom";

function Navigator() {
    return (
        <div>
            <div>네비게이션</div>
            <Link to={"/items"}>상품목록</Link>
            <Link to={"/orders"}>주문목록</Link>
        </div>
    )
}

export default Navigator;