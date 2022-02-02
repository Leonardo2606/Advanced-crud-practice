import React from 'react';
import { ListaContainer, ListaTableDiv } from '../style';
import { Typography, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import { store } from '../redux/store';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Lista = () => {

    const columns = [
        { field: 'id', headerName: 'Nome', width: 250 },
        { field: 'cidadeUf', headerName: 'Cidade/UF', width: 150 },
        { field: 'cep', headerName: 'CEP', type:'number', width: 130 },
        {
          field: 'dataDeAbertura',
          headerName: 'Data de abertura',
          width: 150,
        },
    ];

    const rows = store.getState().empresasArrayView;

    return (
        <ListaContainer>
            <Link style={{textDecoration: 'none'}} to={'/'}>
                <Typography sx={{color: 'white'}} variant='p'>
                    Menu /{' '}
                    <Typography fontWeight={'bold'} variant='button'>Lista de Empresas</Typography>
                </Typography>
            </Link>
            
            <ListaTableDiv>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
                   
            </ListaTableDiv>
            <Link to={'/Cadastro'}>
                <Tooltip title='Nova Empresa'>
                    <IconButton sx={
                            {
                                color: 'orange',
                                m:'auto',
                                position: 'sticky',
                                bottom: 0,
                                left: 1025,
                                '@media (max-width:860px)':{
                                    mr:2
                                }
                            }}>
                        <AddCircleIcon sx={{fontSize: 50}}/>
                    </IconButton>
                </Tooltip> 
            </Link>
        </ListaContainer>
    )

}

export default Lista;