import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ItemBasketInfo({ itemInfo }) {

    const navigate = useNavigate();

    return (
        <tr>
            <td>{itemInfo.name}</td>
            <td>{itemInfo.price}</td>
            <td>{itemInfo.stockQuantity}</td>
            <td><Button size={"sm"} onClick={() => {navigate("/orders/payment", {state:{itemList:[itemInfo]}})}}>결제</Button></td>
            <td><Button size={"sm"} variant={"danger"}>삭제</Button></td>
        </tr>
    )
}

export default ItemBasketInfo;