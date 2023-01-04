import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function ItemList({ isLogin, setLogin }) {

    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getItems = async () => {
        await axios(
            {
                url: '/item/all',
                method: 'get',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(function (response) {
            let jwtHeader = response.headers.get("Authorization")
            let jwtToken = '';
            console.log(response);
            if (jwtHeader !== undefined) {
                if (jwtHeader.startsWith('Bearer ')) {
                    jwtToken = jwtHeader.replace('Bearer ', '');
                }
                console.log(jwtToken)
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${jwtToken}`;
            }
            setLoading(false);
            setItems(response.data);
        }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getItems();
    }, [])

    return (
        <div>
            <h1>상품목록</h1>
            {
                isLoading === false ?
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>제품</th>
                                <th>가격</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(function (a) {
                                return (
                                    <tr>
                                        <td>{a.name}</td>
                                        <td>{a.price}</td>
                                        <td><Link to={`/items/${a.id}`}>상세보기</Link></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table> : null
            }
        </div>
    )
}

export default ItemList;