import React, { useState, useEffect } from 'react';
import { ListaContainer, LinkBox } from '../style';
import {Link} from 'react-router-dom';
import { deleteCompany, getCompanies } from '../redux/companiesReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, IconButton, Tooltip, Paper } from '@mui/material';
import kappa from '../assets/kappa.png'
import ListTableCell from './muiCustomComponents/ListTableCell';
import ListFormEditing from './ListFormEditing';
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
    const empresasStatus = useSelector(state => state.companies.status);

    useEffect(()=>{
        if(empresasStatus === 'idle') {
            dispatch(getCompanies())
        }
    }, [empresasStatus, dispatch])

    //////////////////////////////////////////////////////
    const [openClose, setOpenClose] = useState(false);
    function handleOpenCloseDialog() {
        setOpenClose(prev => !prev)
    }
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
    const [actualEmpresaIndex, setActualEmpresaIndex] = useState();
     function changeEmpresa(empresa, index) {
        dateFormatPromisse(empresa)
        .then((updatedEmpresa)=>{
            setActualEmpresa(updatedEmpresa);
            setActualEmpresaIndex(index);
            handleOpenCloseDialog();
        })
        .catch((err)=>console.log(err));
    }
    //////////////////////////////////////////////////////

    return (
        <ListaContainer>

            <ListFormEditing closeDialogFunc={handleOpenCloseDialog} onOrOff={openClose} empresa={actualEmpresa} idx={actualEmpresaIndex}/>

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
                        { empresasStatus === 'loading'
                            ?   (
                                    <TableRow sx={{height:62}}>
                                        <TableCell sx={{color:'white', textShadow:'1px 1px 10px black', background:`url(${kappa}) center/50px 60px no-repeat`}} align='center' colSpan={5}>Loading</TableCell>
                                    </TableRow>
                                )
                            : empresas.map((empresa, index)  => {
                            return (
                                <TableRow
                                    selected
                                    key={index}
                                >

                                    <ListTableCell ID='nome' value={empresa.name}/>
                                    <ListTableCell ID='email' value={empresa.email}/>
                                    <ListTableCell ID='cep' value={empresa.address.cep}/>
                                    <ListTableCell ID='data' value={empresa.data}/>
                                    
                                    <TableCell id='nonEditable' align='right' sx={{padding:1, paddingLeft:2, height:30}}>
                                        <Tooltip title='Editar'>
                                            <IconButton disabled={openClose} onClick={()=>{
                                                changeEmpresa(empresa, index);
                                            }}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Deletar'>
                                            <IconButton disabled={openClose} onClick={()=>{
                                                try {
                                                    dispatch(deleteCompany(empresa.id)).unwrap();
                                                } catch (err) {
                                                    console.log(err);
                                                }
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



/*<LinkBox>
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
            </LinkBox>*/