import { useRef, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { Form, Main } from '../../components/styles/Main';
import { Header } from '../../components/styles/Header';

function ItemAdd({ isLogin, setLogin }) {

    const navigate = useNavigate();
    const imgInput = useRef();
    const [isLoading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const addItem = async (e) => {

        e.preventDefault();
        setLoading(true);
        if (file === null || file === undefined) {
            alert("제품 이미지를 업로드해주세요");
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("json",
            new Blob([
                JSON.stringify(
                    {
                        "name": e.target[0].value,
                        "price": e.target[1].value,
                        "stockQuantity": e.target[2].value
                    }
                )], { type: "application/json" })
        )

        await axios(
            {
                url: '/item/add',
                method: 'post',
                baseURL: `${process.env.REACT_APP_BACKEND}`,
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData
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
            navigate("/items");
        }).catch(error => console.error('Error:', error));
    }

    return (
        isLogin ?
            <Container>
                <Header>제품등록</Header>
                <Main>
                    <Form onSubmit={addItem}>
                        <div>
                            <label htmlFor="name">제품명</label>
                            <input id="name" type="text" placeholder="제품의 이름을 적어주세요" required />
                        </div>
                        <div>
                            <label htmlFor="price">금액</label>
                            <input id="price" type="number" placeholder="제품의 금액을 적어주세요" required />
                        </div>
                        <div>
                            <label htmlFor="count">수량</label>
                            <input id="count" type="number" placeholder="제품의 수량을 적어주세요" required />
                        </div>
                        <div>
                            <label htmlFor="image">제품사진</label>
                            <input id="image" type="file" style={{ "display": "none" }} ref={imgInput} onChange={handleChangeFile} />
                            <div className='uploader' onClick={() => { imgInput.current?.click() }}>
                                {
                                    file === null || file === undefined ?
                                        "제품사진 업로드" : file.name
                                }
                            </div>
                        </div>
                        {
                            isLoading ?
                                <Button variant="primary" disabled>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {" 등록신청..."}
                                </Button> :
                                <Button variant="primary" type="submit">
                                    등록신청
                                </Button>
                        }
                    </Form>
                </Main>
            </Container> : <Navigate to={"/"} />
    )
}

export default ItemAdd;