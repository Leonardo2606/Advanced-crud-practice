import React, { useState, useEffect } from 'react';
import { ListaContainer } from '../style';
import { Typography, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { deleteCompanyAction, editCompanyAction } from '../redux/companiesReducer';
import { useSelector, useDispatch } from 'react-redux';
import { editedRow } from '../services/helpers';

const List = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const dispatch = useDispatch();
    const empresas = useSelector(state => state.companies.empresasArrayView);

    return (
        <ListaContainer>
            <Link style={{textDecoration: 'none'}} to={'/'}>
                <Typography sx={{color: 'white'}} variant='p'>
                    Menu /{' '}
                    <Typography fontWeight={'bold'} variant='button'>Lista de Empresas</Typography>
                </Typography>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}} width={300}>Nome</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} width={150}>CEP</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} width={150}>Estado</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} width={150}>Data de abertura</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody id='companiesTable'>
                        {empresas.map((empresa, index)  => {
                            return (
                                <TableRow
                                    className='trows'
                                    selected
                                    accessKey={0}
                                    key={index} 
                                    sx={{alignContent:'center'}}>
                                    <TableCell
                                        contentEditable={selectedRows.includes(index)} 
                                        id='nome'
                                        className='campo'
                                        suppressContentEditableWarning={true} 
                                        >
                                            {empresa.name}
                                    </TableCell>
                                    <TableCell
                                        contentEditable={selectedRows.includes(index)} 
                                        id='cep'
                                        className='campo'
                                        suppressContentEditableWarning={true}
                                        >
                                            {empresa.cep}
                                    </TableCell>
                                    <TableCell
                                        contentEditable={selectedRows.includes(index)} 
                                        id='uf'
                                        className='campo'
                                        suppressContentEditableWarning={true}
                                        >
                                            {empresa.ufSelected}
                                    </TableCell>
                                    <TableCell
                                        contentEditable={selectedRows.includes(index)} 
                                        id='data'
                                        className='campo'
                                        suppressContentEditableWarning={true}
                                        >
                                            {empresa.data}
                                    </TableCell>
                                    <TableCell id='nonEditable' align='right'>
                                        <Tooltip title='Editar'>
                                            {selectedRows.includes(index)
                                                ? (
                                                    <IconButton onClick={(ev)=>{
                                                        dispatch(editCompanyAction({valores:editedRow(ev), index}));
                                                        let newState = [...selectedRows];
                                                        newState = newState.filter(idx => idx !== index)
                                                        setSelectedRows(newState);
                                                    }}>
                                                        <SaveIcon/>
                                                    </IconButton>
                                                ) 
                                                : (
                                                    <IconButton onClick={()=>{
                                                        setSelectedRows([...selectedRows, index]);
                                                    }}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                )}
                                        </Tooltip>
                                        <Tooltip title='Deletar'>
                                            <IconButton onClick={()=>{
                                                dispatch(deleteCompanyAction(index));
                                            }}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Link to={'/Register'}>
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

export default List;