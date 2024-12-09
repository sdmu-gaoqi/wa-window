import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    input: {
        background-color: #fff;
        color: #5e5e5e;
        outline: none;
        border: none;
        border-radius: 2px;
    }
    select {
        background-color: #fff;
        color: #5e5e5e;
        outline: none;
        border: none;
        border-radius: 2px;

        option {
            color: #5e5e5e;
        }
    }
    textarea {
        background-color: #fff;
        color: #5e5e5e;
        outline: none;
        border: none;
        border-radius: 2px;
    }
`;
