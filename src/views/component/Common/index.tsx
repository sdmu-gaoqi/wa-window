import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    input: {
        background-color: var(--vscode-input-background);
        color: var(--vscode-foreground);
        outline: none;
        border-radius: 2px;
    }
    select {
        background-color: var(--vscode-input-background);
        color: var(--vscode-foreground);
        outline: none;
        border-radius: 2px;

        option {
            color: var(--vscode-foreground);
        }
    }
    textarea {
        background-color: var(--vscode-input-background);
        resize: none;
        color: var(--vscode-foreground);
        outline: none;
        border-radius: 2px;
    }
`;
