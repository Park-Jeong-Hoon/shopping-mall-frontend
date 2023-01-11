import { Form } from "react-bootstrap";

function OrderItemInfo({ itemInfo, controlQuantity }) {
    return (
        <>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>상품명</Form.Label>
                <Form.Control type="text" defaultValue={itemInfo.name} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>금액</Form.Label>
                <Form.Control type="number" defaultValue={itemInfo.price} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => { controlQuantity(e, itemInfo.id) }}>
                <Form.Label>수량</Form.Label>
                <Form.Control type="number" placeholder="상품의 수량을 적어주세요" required min={1} />
                <Form.Text>
                    {`수량이 재고보다 많을 경우 주문이 이뤄지지 않습니다.`}
                </Form.Text>
            </Form.Group>
            <hr />
        </>
    )
}

export default OrderItemInfo;