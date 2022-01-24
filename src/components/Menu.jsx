import React from 'react';
import {Button} from '@mui/material';
import {MenuContainer} from '../style';
import {Link} from 'react-router-dom';

const Menu = () => {

    return (

        <MenuContainer>
            <Button variant='contained'>Listar Empresas</Button>
            <Button variant='contained'>Cadastrar Empresas</Button>
        </MenuContainer>

    )

}

export default Menu;