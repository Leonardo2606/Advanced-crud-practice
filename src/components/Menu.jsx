import React from 'react';
import {Button} from '@mui/material';
import {MenuContainer} from '../style';
import {Link} from 'react-router-dom';

const Menu = () => {

    return (

        <MenuContainer>
            <Link style={{textDecoration: 'none'}} to={'/List'}>
                <Button variant='contained'>Listar Empresas</Button>
            </Link>
            <Link style={{textDecoration:'none'}} to='/Register'>
                <Button variant='contained'>Cadastrar Empresas</Button>
            </Link>
            
        </MenuContainer>

    )

}

export default Menu;