import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ItemBasketInfo({ itemInfo }) {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const deleteItem = async () => {
        setLoading(true);
        await axios(
            {
                url: '/item/basket/delete',
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                data: itemInfo.id
            }
        ).then(function (response) {
            let jwtHeader = response.headers.get("Authorization")
            let jwtToken = '';
            if (jwtHeader !== undefined) {
                if (jwtHeader.startsWith('Bearer ')) {
                    jwtToken = jwtHeader.replace('Bearer ', '');
                }
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${jwtToken}`;
            }
            setLoading(false);
        }).catch(error => console.error('Error:', error));
    }

    return (
        <tr>
            <td>{itemInfo.name}</td>
            <td>{itemInfo.price}</td>
            <td>{itemInfo.stockQuantity}</td>
            <td><Button size={"sm"} onClick={() => {navigate("/orders/payment", {state:{itemList:[itemInfo]}})}}>결제</Button></td>
            <td><Button size={"sm"} variant={"danger"} onClick={deleteItem}>삭제</Button></td>
        </tr>
    )
}

export default ItemBasketInfo;