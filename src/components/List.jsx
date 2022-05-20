import React, { useState } from 'react';
import { ListaContainer, LinkBox } from '../style';
import { Typography, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteCompanyAction, editCompanyAction } from '../redux/companiesReducer';
import { useSelector, useDispatch } from 'react-redux';
import { editedRow, restoreInfo } from '../services/listHelpers';

const List = () => {

    const [selectedRow, setSelectedRow] = useState(null);
    const [unchangedInfo, setUnchangedInfo] = useState({});
    const dispatch = useDispatch();
    const empresas = useSelector(state => state.companies.empresasArrayView);

    return (
        <ListaContainer>
            <LinkBox>
                <Link style={{textDecoration: 'none'}} to={'/'}>
                    <Typography sx={{color: 'white'}} variant='p'>
                        <Tooltip title='Retornar'>
                                <IconButton sx={{color: 'white', m:0, p:0}}>
                                    <ArrowBackIosIcon viewBox='-5 0 24 24'/>
                                </IconButton>
                        </Tooltip>
                        Menu /{' '}
                        <Typography fontWeight={'bold'} variant='button'>Lista de Empresas</Typography>
                    </Typography>
                </Link>    
            </LinkBox>
            
            <TableContainer sx={{overflow:'auto'}} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold', minWidth:150}}>Nome</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:150}}>Email</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:100}}>CEP</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:100}}>Data de abertura</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {empresas.map((empresa, index)  => {
                            return (
                                <TableRow
                                    className='trows'
                                    selected
                                    accessKey={0}
                                    key={index}>
                                    <TableCell
                                        contentEditable={selectedRow === index} 
                                        id='nome'
                                        className='campo'
                                        suppressContentEditableWarning={true}
                                    >
                                        {empresa.name}
                                    </TableCell>
                                    <TableCell
                                        contentEditable={selectedRow === index} 
                                        id='email'
                                        className='campo'
                                        suppressContentEditableWarning={true}
                                    >
                                        {empresa.email}
                                    </TableCell>
                                    
                                    <TableCell 
                                        id='cep'
                                        className='campo'
                                        contentEditable={selectedRow === index}
                                        suppressContentEditableWarning={true}
                                    >
                                        {empresa.cep}
                                    </TableCell>
                                    <TableCell
                                        contentEditable={selectedRow === index} 
                                        id='data'
                                        className='campo'
                                        suppressContentEditableWarning={true}
                                    >
                                        {empresa.data}
                                    </TableCell>
                                    <TableCell id='nonEditable' align='right'>
                                        <Tooltip title='Editar'>
                                            {selectedRow === index
                                                ? (
                                                    <>
                                                        <Tooltip title='Salvar'>
                                                            <IconButton onClick={(ev)=>{
                                                                dispatch(editCompanyAction({valores:editedRow(ev), index}));
                                                                setSelectedRow(null);
                                                            }}>
                                                                <SaveIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='Cancelar'>
                                                            <IconButton onClick={(ev)=>{
                                                                restoreInfo(ev, unchangedInfo);
                                                                setSelectedRow(null);
                                                            }}>
                                                                <CancelIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </>
                                                ) 
                                                : (
                                                    <IconButton onClick={()=>{
                                                        if(selectedRow !== null) return;
                                                        else {
                                                            setUnchangedInfo({...empresa});
                                                            setSelectedRow(index);
                                                        }
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                )}
                                        </Tooltip>
                                        <Tooltip title='Deletar'>
                                            <IconButton onClick={()=>{
                                                dispatch(deleteCompanyAction(index));
                                            }}>
                                                <DeleteIcon />
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