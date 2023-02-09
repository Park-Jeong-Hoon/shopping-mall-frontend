import React from 'react';
import styled from 'styled-components';

export const SpinnerStyle = styled.svg`
    border: 16px solid #C6C9CC;
    border-top: 16px black solid;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    animation: spin 2s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
`;