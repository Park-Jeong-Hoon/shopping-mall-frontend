import { InfoTable } from "../../components/styles/Main";

function OrderDetailCard({ orderItemInfo, CommaFormat }) {

    return (
        <InfoTable>
            <thead>
                <tr>
                    <th>제품명</th>
                    <th>{orderItemInfo.itemName}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>단가</td>
                    <td>{`${CommaFormat(orderItemInfo.price)}\\`}</td>
                </tr>
                <tr>
                    <td>수량</td>
                    <td>{CommaFormat(orderItemInfo.quantity)}</td>
                </tr>
                <tr>
                    <td>제품사진</td>
                    <td>                        <img src={`${orderItemInfo.imageName}`}
                        style={{ width: "200px", height: "150px" }} /></td>
                </tr>
                <tr>
                    <td>판매자</td>
                    <td>{CommaFormat(orderItemInfo.username)}</td>
                </tr>
            </tbody>
        </InfoTable>
    )
}

export default OrderDetailCard;