import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ItemCard({ itemInfo, setDeleteLoading }) {

    const navigate = useNavigate();

    const CommaFormat = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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
        <div className="item-card">
            <div>{itemInfo.id}</div>
            <div><img src={`${itemInfo.imageName}`} /></div>
            <div>
                <div>{itemInfo.name}</div>
                <div>:</div>
                <div>{`${CommaFormat(itemInfo.price)}\\`}</div>
            </div>
            {
                setDeleteLoading !== undefined ?
                    <span className="btns-group">
                        <Button size={"sm"} variant={"danger"} onClick={deleteItem}>삭제</Button>
                        <Button style={{"margin-left":"10px"}} size={"sm"} onClick={() => { navigate(`/items/${itemInfo.id}`) }}>상세보기</Button>
                    </span> : 
                    <div className="detail-btn"><Button size='sm' onClick={() => { navigate(`/items/${itemInfo.id}`) }}>상세보기</Button></div>
            }
        </div>
    )
}

export default ItemCard;