import styled from "styled-components";

const Cabecalho = styled.div`

    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    justify-content: space-between;
    width: 83vw;
    margin: 2em;
    
    .cb-usuario {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 1.5em;
        width: 100vh;
    }

    .nick span {
        color: #615858;
    }

    .nick {
        margin: 1em;
        font-family: Roboto
    }


    .botoes-cabecalho button{
        align-items: center;
        padding: 1em;
        border-radius: 3em;
        border: solid 0px;
        background-color: #986CDF;
        margin: 1em;
    }
`


export {Cabecalho}