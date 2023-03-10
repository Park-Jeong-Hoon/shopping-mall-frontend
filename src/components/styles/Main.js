import React from "react";
import styled from "styled-components";

export const Main = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;

    .line {
        width: 100%;
        border: 2px dotted #EAEAED;
        margin-bottom: 20px;

        @media (min-width:800px) {
            width: 600px;
        }
    }

    .item-container, .order-container {
        display:flex;
        flex-direction: row;
        flex-wrap : wrap;
        justify-content: space-between;
        width: 100%;
    }

    .item-card {
        width: 300px;
        border: 1px solid #C6C9CC;
        border-radius: 5px;
        margin-bottom: 30px;
        padding: 20px;
        font-size: 18px;

        div {
            display: flex;
            width: 100%;
        }
        
        div:nth-child(2) {
            justify-content: center;
            align-items: center;
        }

        div:nth-child(3) {
            margin-top: 5px;
            margin-bottom: 5px;
            div {
                justify-content: center;
                align-items: center;
            }
        }

        .btns-group {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        .detail-btn {
            justify-content: flex-end;
            align-items: center;
        }

        img {
            border-radius: 5px;
            width: 100%;
            height: 200px;
            
            @media (max-width:768px) {
                width: 200px;
                height: 150px
            }
        }

        @media (max-width:768px) {
            width: 100%;
        }
    }

    .order-card {
        width: 300px;
        border: 1px solid #C6C9CC;
        border-radius: 5px;
        margin-bottom: 30px;
        padding: 20px;
        font-size: 18px;

        div {
            display: flex;
            width: 100%;
        }

        .detail-btn {
            justify-content: flex-end;
            align-items: center;
        }

        @media (max-width:768px) {
            width: 100%;
        }
    }
`

export const MainForLoading = styled(Main)`
    height: calc(100vh - 56px - 80px);
`

export const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px;
    text-align: center;

    th {
        background: #42444E;
        color: #FFFFFF;
        padding: 14px;
    }
    tr:first-child th:first-child {
        border-top-left-radius: 5px;
    }
    tr:first-child th:last-child {
        border-top-right-radius: 5px;
    }
    td {
        border-right: 1px solid #C6C9CC;
        border-bottom: 1px solid #C6C9CC;
        padding: 10px;
    }
    td:first-child {
        border-left: 1px solid #C6C9CC;
    }
    tr:nth-child(even) td {
        background: #EAEAED;
    }
    tr:last-child td:first-child {
        border-bottom-left-radius: 5px;
    }
    tr:last-child td:last-child {
        border-bottom-right-radius: 5px;
    }
`

export const InfoTable = styled(Table)`
    margin-bottom: 20px;

    @media (min-width:800px) {
        width: 600px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    
    div {
        display: flex;
        flex-direction: column;
        color: 42444E;

        label {
            font-size: 18px;
        }

        input {
            border: 1px solid #C6C9CC;
            border-radius: 5px;
            height: 40px;
            font-size: 20px;
            padding: 5px;
            margin-bottom: 30px;
        }
    }

    .uploader {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px;
        border-radius: 5px;
        font-size: 20px;
        background-color: #C6C9CC;
        margin-bottom: 30px;
        cursor: pointer;
    }

    @media (min-width:800px) {
        width: 600px;
    }
`