import styled from "styled-components";

export const Button = styled.button`
  background-color: transparent;
  color: white;
  outline: none;
  height: 30px;
  font-size: var(--vscode-font-size);
  width: 100%;
  cursor: pointer;
  color: var(--vscode-button-foreground);
  background-color: var(--vscode-button-background);
  border: none;
  margin: 2px 0;
  &:hover,
  &:active {
    color: var(--vscode-button-foreground);
    background-color: var(--vscode-button-hoverBackground);
  }
`;
