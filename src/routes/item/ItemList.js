import { useState, useEffect } from 'react';
import axios from 'axios';

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
            <hr />
            {
                isLoading === false ?
                    <div>
                        {items.map(function (a) {
                            return (
                                <div className="list">
                                    <h3>{a.name}</h3>
                                    <p>hello</p>
                                    <hr />
                                </div>
                            );
                        })}
                    </div> : null
            }
        </div>
    )
}

export default ItemList;