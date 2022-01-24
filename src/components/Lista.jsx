import React from 'react';
import { ListaContainer, ListaTableDiv } from '../style';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom';

const Lista = () => {

    const columns = [
        { field: 'id', headerName: 'Identificação', width: 250 },
        { field: 'cidadeUf', headerName: 'Cidade/UF', width: 150 },
        { field: 'cep', headerName: 'CEP', type:'number', width: 130 },
        {
          field: 'dataDeAbertura',
          headerName: 'Data de abertura',
          width: 150,
        },
      ];
      
      const rows = [
        { id: 'Facebook Inc.', cidadeUf: 'Curitiba/PR', cep: '80.320-320', dataDeAbertura: '08/2020' },
        { id: 'Facebook Inc.', cidadeUf: 'Curitiba/PR', cep: '80.320-320', dataDeAbertura: '08/2020' },
        { id: 'Facebook Inc.', cidadeUf: 'Curitiba/PR', cep: '80.320-320', dataDeAbertura: '08/2020' },
        { id: 'Facebook Inc.', cidadeUf: 'Curitiba/PR', cep: '80.320-320', dataDeAbertura: '08/2020' },
        { id: 'Facebook Inc.', cidadeUf: 'Curitiba/PR', cep: '80.320-320', dataDeAbertura: '08/2020' },
        { id: 'Facebook Inc.', cidadeUf: 'Curitiba/PR', cep: '80.320-320', dataDeAbertura: '08/2020' },
        { id: 'Facebook Inc.', cidadeUf: 'Curitiba/PR', cep: '80.320-320', dataDeAbertura: '08/2020' },
        { id: 'Facebook Inc.', cidadeUf: 'Curitiba/PR', cep: '80.320-320', dataDeAbertura: '08/2020' },
      ];

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
        
        </ListaContainer>
    )

}

export default Lista;