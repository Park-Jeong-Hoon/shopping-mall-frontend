import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function OrderCard({ orderInfo }) {

    const navigate = useNavigate();

    const CommaFormat = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="order-card">
            <div>{`#${orderInfo.id}`}</div>
            <div>{orderInfo.orderStatus === "ORDER" ? "주문완료"
                : orderInfo.orderStatus === "CANCEL" ? "주문취소"
                    : "부분주문취소"}</div>
            <div>{`${orderInfo.orderDate.split('T')[0]} ${orderInfo.orderDate.split('T')[1]}`}</div>
            <div>{`${CommaFormat(orderInfo.price)}\\`}</div>
            <div>{orderInfo.deliveryStatus === "READY" ? "준비중" : orderInfo.deliveryStatus === "START" ? "배송시작" : "배송완료"}</div>
            <div className="detail-btn"><Button size='sm' onClick={() => { navigate(`/orders/${orderInfo.id}`) }}>상세보기</Button></div>
        </div>
    )
}

export default OrderCard;