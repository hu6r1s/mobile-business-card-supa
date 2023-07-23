import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
`

export const FrameDiv = styled.div`
  margin: 0px auto;
  min-height: calc(var(--vh, 1vh) * 100);
  width: 768px;
  margin: 0 auto;
  background: linear-gradient(#F7D6AB 10%, #FCF4E9, #FCF4E9, #FCF4E9, #FCF4E9);
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  overflow: auto;
`