import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ItemBasketInfo({ itemInfo, setDeleteLoading }) {

    const navigate = useNavigate();

    const deleteItem = async () => {
        setDeleteLoading(true);
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
            setDeleteLoading(false);
        }).catch(error => console.error('Error:', error));
    }

    return (
        <tr>
            <td>{itemInfo.id}</td>
            <td>{itemInfo.name}</td>
            <td>{itemInfo.price}</td>
            <td>{itemInfo.stockQuantity}</td>
            <td><Button size={"sm"} onClick={() => {navigate("/orders/payment", {state:{itemList:[itemInfo]}})}}>결제</Button></td>
            <td><Button size={"sm"} variant={"danger"} onClick={deleteItem}>삭제</Button></td>
        </tr>
    )
}

export default ItemBasketInfo;