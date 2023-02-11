function OrderItemInfo({ itemInfo, controlQuantity }) {
    
    return (
        <>
            <div>
                <label htmlFor="name">상품명</label>
                <input id="name" type="text" defaultValue={itemInfo.name} readOnly />
            </div>
            <div>
                <label htmlFor="price">금액</label>
                <input id="price" type="number" defaultValue={itemInfo.price} readOnly />
            </div>
            <div onChange={(e) => { controlQuantity(e, itemInfo.id) }}>
                <label htmlFor="count">수량</label>
                <input id="count" type="number" placeholder="상품의 수량을 적어주세요" required min={1} />
            </div>
            <hr />
        </>
    )
}

export default OrderItemInfo;