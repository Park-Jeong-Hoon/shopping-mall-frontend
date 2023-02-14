import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Main, MainForLoading } from '../../components/styles/Main';
import PageSpinner from '../../components/PageSpinner';
import ItemCard from './ItemCard';
import { Header } from '../../components/styles/Header';

function ItemList({ isLogin, setLogin }) {

    const { name } = useParams();
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();

    const getOwnItems = async () => {
        await axios(
            {
                url: '/item/owns',
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

    const getItems = async () => {
        if (name === undefined) {
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
        } else {
            await axios(
                {
                    url: `/item/all/${name}`,
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
                if (jwtHeader !== undefined) {
                    if (jwtHeader.startsWith('Bearer ')) {
                        jwtToken = jwtHeader.replace('Bearer ', '');
                    }
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${jwtToken}`;
                }
                setLoading(false);
                setItems(response.data);
            }).catch(error => console.error('Error:', error));
        }
    }

    useEffect(() => {
        if (location.pathname === "/items/own") {
            getOwnItems();
        } else {
            getItems();
        }
    }, [name, location.pathname])

    return (
        <Container>
            <Header>제품목록</Header>
            {
                isLoading === false ?
                    <Main>
                        <div className='item-container'>
                            {
                                items.map(function (i) {
                                    return (
                                        <ItemCard key={i.id} itemInfo={i} />
                                    )
                                })
                            }
                        </div>
                    </Main> : <MainForLoading><PageSpinner /></MainForLoading>
            }
        </Container>
    )
}

export default ItemList;