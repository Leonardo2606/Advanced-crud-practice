import React, { useState, useEffect } from 'react';
import { ListaContainer } from '../style';
import { Link } from 'react-router-dom';
import { deleteCompany, getCompanies } from '../redux/companiesReducer';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Tooltip, Paper, Alert, Slide } from '@mui/material';
import ListTableCell from './muiCustomComponents/ListTableCell';
import ListFormEditing from './ListFormEditing';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const List = () => {

    const dispatch = useDispatch();
    const {empresasArrayStorage: companies, listAlert, editingStatus} = useSelector(state => state.companies);
    const empresasStatus = useSelector(state => state.companies.status);

    useEffect(()=>{
        if(empresasStatus === 'idle') {
            dispatch(getCompanies());
        }
    }, [empresasStatus, dispatch])

    //////////////////////////////////////////////////////

    const [openClose, setOpenClose] = useState(false);
    function handleEditingSwitch() {          //// This function opens the ListFormEditing component.
        setOpenClose(prev => !prev)
    }
    function dateFormatPromisse(company) {
        return new Promise((resolve, reject) => {
            let updateCompany= company;
            let formattedDateCompany = company.data.split(' / ').reverse().join('-');
            let inputEditDate = new Date(formattedDateCompany);
            updateCompany = {...updateCompany, data:inputEditDate.toISOString().split('T')[0]}
            resolve(updateCompany);
            reject('Não foi possivel formatar a data');
        })
    }
    const [actualEmpresa, setActualEmpresa] = useState({});
    const [actualEmpresaIndex, setActualEmpresaIndex] = useState();
    function changeCompany(company, index) {
        dateFormatPromisse(company)
        .then((updatedEmpresa)=>{
            setActualEmpresa(updatedEmpresa);
            setActualEmpresaIndex(index);
            handleEditingSwitch();
        })
        .catch((err)=>console.log(err));
    }
    //////////////////////////////////////////////////////

    return (
        <ListaContainer>
          
            <Slide direction='down' in={listAlert} mountOnEnter unmountOnExit >
                <Alert 
                    severity='success'
                    sx={{
                        width:260,
                        margin: '10px auto',
                    }}>
                        {editingStatus === 'loading' ? 'Loading'
                            : editingStatus === 'success' ? 'Empresa Editada' 
                            : 'Nova Empresa Adicionada!'
                        }
                </Alert>
            </Slide>

            <ListFormEditing editingSwitch={handleEditingSwitch} onOrOff={openClose} empresa={actualEmpresa} idx={actualEmpresaIndex}/>

            <TableContainer sx={{overflow:'auto'}} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold', minWidth:150}}>Nome</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:150}}>Email</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:150}}>CEP</TableCell>
                            <TableCell sx={{fontWeight: 'bold', minWidth:150}}>Data de abertura</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { empresasStatus === 'loading'
                            ?   (
                                    <TableRow sx={{height:62}}>
                                        <TableCell>Loading</TableCell>
                                        <TableCell>Loading</TableCell>
                                        <TableCell>Loading</TableCell>
                                        <TableCell>Loading</TableCell>
                                        <TableCell>Loading</TableCell>
                                    </TableRow>
                                )
                            : companies.map((company, index)  => {
                            return (
                                <TableRow
                                    selected
                                    key={index}
                                >

                                    <ListTableCell ID='nome' value={company.name}/>
                                    <ListTableCell ID='email' value={company.email}/>
                                    <ListTableCell ID='cep' value={company.address.cep}/>
                                    <ListTableCell ID='data' value={company.data}/>
                                    
                                    <TableCell id='nonEditable' align='right' sx={{padding:1, paddingLeft:2, height:30}}>
                                        <Tooltip title='Editar'>
                                            <IconButton disabled={openClose} onClick={()=>{
                                                changeCompany(company, index);
                                            }}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Deletar'>
                                            <IconButton disabled={openClose} onClick={()=>{
                                                try {
                                                    dispatch(deleteCompany(company.id)).unwrap();
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