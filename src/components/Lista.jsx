import React, { useEffect } from 'react';
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
import { deletarEmpresaAction, editarEmpresaAction } from '../redux/empresasReducer';
import { useSelector, useDispatch } from 'react-redux';
import { editedRow } from '../services/helpers';

const Lista = () => {

    const dispatch = useDispatch();
    const empresas = useSelector(state => state.empresas.empresasArrayView);
    //const [saveEditIcon, setSaveEditIcon] = useState(<EditIcon />);

    /*function handleCellEdit(ev) {
        const valor = ev.target.innerHTML;
        const id = ev.target.id;        forma antiga de editar a linha da tabela, cada célula disparava a action do reducer, atualizando-a.
        const valores = {valor, id};
        return valores;
    }*/

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
                    <TableBody>
                        {empresas.map((empresa, index) => {
                            return (
                                <TableRow
                                    className='trows'
                                    selected
                                    accessKey={0}
                                    key={index} 
                                    sx={{alignContent:'center'}}>
                                    <TableCell 
                                        id='nome'
                                        className='campo'
                                        /*onBlur={ev=>{
                                            setNome(ev.target.innerHTML)
                                            //dispatch(editarEmpresaAction({valores:handleCellEdit(ev), index}));
                                        }}*/
                                        suppressContentEditableWarning={true} 
                                        >
                                            {empresa.nome}
                                    </TableCell>
                                    <TableCell 
                                        id='cep'
                                        className='campo'
                                        /*onBlur={ev=>{
                                            setCep(ev.target.innerHTML)
                                            dispatch(editarEmpresaAction({valores:handleCellEdit(ev), index}));
                                        }}*/
                                        suppressContentEditableWarning={true}
                                        >
                                            {empresa.cep}
                                    </TableCell>
                                    <TableCell 
                                        id='uf'
                                        className='campo'
                                        suppressContentEditableWarning={true}
                                        >
                                            {empresa.ufSelected}
                                    </TableCell>
                                    <TableCell 
                                        id='data'
                                        className='campo'
                                        /*onBlur={ev=>{
                                            setDate(ev.target.innerHTML)
                                            dispatch(editarEmpresaAction({valores:handleCellEdit(ev), index}));
                                        }}*/
                                        suppressContentEditableWarning={true}
                                        >
                                            {empresa.data}
                                    </TableCell>
                                    <TableCell id='nonEditable' align='right'>
                                        <Tooltip title='Editar'>
                                            <IconButton
                                                accessKey={0}
                                                onClick={(ev)=>{
                                                    let podeEnviar = ev.target.closest('button');
                                                    if(podeEnviar.accessKey == 0){editedRow(ev); console.log('editando'); podeEnviar.accessKey=1}
                                                    else {dispatch(editarEmpresaAction({valores:editedRow(ev), index})); podeEnviar.accessKey=0}
                                                    //dispatch(editarEmpresaAction({valores:editedRow(ev), index}))
                                                }
                                                }
                                                >
                                                    <EditIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Deletar'>
                                            <IconButton onClick={()=>{
                                                dispatch(deletarEmpresaAction(index));
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