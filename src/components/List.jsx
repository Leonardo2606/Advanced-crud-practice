import React, { useState } from 'react';
import { ListaContainer, LinkBox } from '../style';
import {Link} from 'react-router-dom';
import { deleteCompanyAction, editCompanyAction } from '../redux/companiesReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, IconButton, Tooltip, Paper } from '@mui/material';
import ListDialogEditing from './ListDialogEditing';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const List = () => {

    const dispatch = useDispatch();
    const empresas = useSelector(state => state.companies.empresasArrayStorage);

    const [openClose, setOpenClose] = useState(false);
    function handleOpenCloseDialog() {
        setOpenClose(prev => !prev)
    }
                                  // Importante info sobre essas duas funções embaixo da exportação componente.
    function dateFormatPromisse(empresa) {
        return new Promise((resolve, reject) => {
            let updateEmpresa = empresa;
            let empresaDateFormatted = empresa.data.split(' / ').reverse().join('-');
            let inputEditDate = new Date(empresaDateFormatted);
            updateEmpresa = {...updateEmpresa, data:inputEditDate.toISOString().split('T')[0]}
            resolve(updateEmpresa);
            reject('Não foi possivel formatar a data');
        })
    }
    const [actualEmpresa, setActualEmpresa] = useState({});
     function changeEmpresa(empresa) {
        dateFormatPromisse(empresa)
        .then((updatedEmpresa)=>{
            setActualEmpresa(updatedEmpresa);
            handleOpenCloseDialog();
        })
        .catch((err)=>console.log(err));
    }

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
                                    key={index}>
                                    <TableCell
                                        id='nome'
                                        className='campo'
                                        sx={{padding:1, paddingLeft:2, height:30}}
                                    >
                                        {empresa.name}
                                    </TableCell>
                                    <TableCell
                                        id='email'
                                        className='campo'
                                        sx={{padding:1, paddingLeft:2, height:30}}
                                    >
                                        {empresa.email}
                                    </TableCell>
                                    
                                    <TableCell 
                                        id='cep'
                                        className='campo'
                                        sx={{padding:1, paddingLeft:2, height:30}}
                                    >
                                        {empresa.cep}
                                    </TableCell>
                                    <TableCell
                                        id='data'
                                        className='campo'
                                        sx={{padding:1, paddingLeft:2, height:30}}
                                    >
                                        {empresa.data}
                                    </TableCell>
                                    <TableCell id='nonEditable' align='right' sx={{padding:1, paddingLeft:2, height:30}}>
                                        <Tooltip title='Editar'>
                                            <IconButton onClick={()=>{
                                                changeEmpresa(empresa);
                                            }}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Deletar'>
                                            <IconButton onClick={()=>{
                                                dispatch(deleteCompanyAction(index));
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>

                                    <ListDialogEditing closeDialogFunc={handleOpenCloseDialog} onOrOff={openClose} empresa={actualEmpresa} idx={index}/>

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


/* A função changeEmpresa é executada ao clicar no botão editar na linha da tabela, ela atualiza um estado que conterá a empresa correta da 
linha da tabela, em seguida a função handleOpenCloseDialog é executada, está func simplesmente abre o materialUI na tela, ela está dentro
da função changeEmpresa e não no botão editar porque essa foi a forma encontrada para o formik do componente ListDialogEditing atualizar as
informações da empresa selecionada dinamicamente. */


/*<TableCell
                                        contentEditable={selectedRow === index} 
                                        id='nome'
                                        className='campo'
                                        suppressContentEditableWarning={true}
                                        sx={{padding:1, paddingLeft:2, height:30}}
                                    >*/