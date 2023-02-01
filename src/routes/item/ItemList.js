import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Table } from 'react-bootstrap';
import Header from "../../components/Header";

function ItemList({ isLogin, setLogin }) {

    const { name } = useParams();
    const naviagate = useNavigate();
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

    const CommaFormat = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            <Header title={'제품목록'} />
            <Container>
                {
                    isLoading === false ?
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>제품</th>
                                    <th>가격</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(function (i) {
                                    return (
                                        <tr>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            <td>{CommaFormat(i.price)}</td>
                                            <td><Button size='sm' onClick={() => {naviagate(`/items/${i.id}`)}}>상세보기</Button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table> : null
                }
            </Container>
        </>
    )
}

export default ItemList;