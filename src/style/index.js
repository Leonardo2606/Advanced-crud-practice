import styled from 'styled-components';

export const LinkBox = styled.div`
    margin: 5px 0 8px 0;
`

/////////////////////////////// Cadastro components start ///////////////////////////////////////////

export const RegisterContainer = styled.div`
    width: clamp(350px,70%,98%);
    margin: auto;
`

export const Form = styled.form`
    width: 100%;
    margin: auto;
    background-color: white;
`

export const FormSection = styled.section`
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
    padding: 0px;
    background-color: white;    
`

export const FormSectionHeader = styled.div`
    width: 100%;
    padding: 10px 0;
    background-color: rgb(105,105,105);
    color: white;
    display: flex;
    justify-content: space-between;
`

export const FormSectionHeaderTitle = styled.p`
    margin: 0;
    margin-left: 10px;
    padding: 0;
`

export const FormSectionBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: inherit;
    padding: 5px;
    padding-bottom: 30px;
`

//////////////////////////////// Cadastro component end /////////////////////////////////////////

//////////////////////////////// Lista component start /////////////////////////////////////////

export const ListFormEdit = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    transition: width 0.5s;
`

export const ListaContainer = styled.div`
    width: 80%;
    margin: 25px auto 0 auto;
    overflow: hidden;
    @media(max-width: 662px) {
        width: 98%;
    }
`

export const ListaTableDiv = styled.div`
    background-color: white;
    height: 700px;
    width: 95%;
    padding: 30px;
`

//////////////////////////////// Lista component end /////////////////////////////////////////