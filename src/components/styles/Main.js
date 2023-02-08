import React from "react";
import styled from "styled-components";

export const Main = styled.main`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
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