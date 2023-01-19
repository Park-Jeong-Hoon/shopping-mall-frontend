import { Card } from "react-bootstrap";

function OrderDetailCard({ orderItemInfo }) {

    return (
        <div>
            <Card>
                <Card.Header as="h4">{orderItemInfo.itemName}</Card.Header>
                <Card.Body>
                    <Card.Title>단가</Card.Title>
                    <Card.Text>
                        {orderItemInfo.price}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title>수량</Card.Title>
                    <Card.Text>
                        {orderItemInfo.quantity}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title>제품사진</Card.Title>
                    <Card.Text>
                        <img src={`${process.env.REACT_APP_IMGSRC}/${orderItemInfo.imageName}`}
                            style={{ width: "200px", height: "150px" }} />
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
        </div>
    )
}

export default OrderDetailCard;