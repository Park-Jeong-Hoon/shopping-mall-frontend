import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ItemCard({ itemInfo }) {

    const naviagate = useNavigate();

    const CommaFormat = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="item-card">
            <div>{itemInfo.id}</div>
            <div><img src={`${itemInfo.imageName}`} /></div>
            <div>
                <div>{itemInfo.name}</div>
                <div>:</div>
                <div>{CommaFormat(itemInfo.price)}</div>
            </div>
            <div><Button size='sm' onClick={() => { naviagate(`/items/${itemInfo.id}`) }}>상세보기</Button></div>
        </div>
    )
}

export default ItemCard;