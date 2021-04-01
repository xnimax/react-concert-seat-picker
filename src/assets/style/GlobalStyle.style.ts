import { createGlobalStyle } from "styled-components";

//BG
import bgimage from "../images/concert.jpg";
export const GlobalStyle = createGlobalStyle`
    html{
        height: 100%;
    }
    body{
        background-image:url(${bgimage});
        background-size:cover;
        display:flex;
        justify-content:center;
        height: 100%;
        overflow:hidden;
    }
    button:focus{
        border:0;
        outline:none;
    }
    *{
        box-sizing: border-box;
    }
`;
