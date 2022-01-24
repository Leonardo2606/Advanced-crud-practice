import React, {useEffect, useState} from 'react';
import { TextField, Select, MenuItem, Typography, IconButton, Tooltip } from '@mui/material';
import {Form, FormSection, FormSectionHeader, FormSectionBody, CadastroContainer,
} from '../style';
import { UFapi } from '../services/api';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const Cadastro = () => {

    const [uf, setUF] = useState([]);
    const [ufSelected, setSelectedUF] = useState('');
    useEffect(()=>{
        UFapi.get('estados').then((response)=>{
            setUF(response.data);
            console.log(response)
        })
        .catch((error)=>{console.log(error)})
    }, [])

    return (
        <CadastroContainer>
            <Link style={{textDecoration: 'none'}} to={'/Lista'}>
                <Typography 
                    fontWeight={'300'} 
                    color={'white'} 
                    variant='button' 
                    component={'p'}
                    ml={0}>
                        <Tooltip title='Retornar'>
                            <IconButton sx={{color: 'white', m:0, p:0}}>
                                <ArrowBackIosIcon viewBox='-5 0 24 24'/>
                            </IconButton>
                        </Tooltip>
                        Lista de Empresas /{' '} 
                        <Typography variant='button' fontWeight={'bold'}>
                            Cadastrar Empresa
                        </Typography> 
                </Typography>
            </Link>
            
            <Form>
                <FormSection>
                    <FormSectionHeader>
                        <Typography variant='h6' ml={1}>Cadastrar Empresa</Typography>
                    </FormSectionHeader>
                    <FormSectionBody>
                        <TextField sx={{m: 1, mr: 1}} variant='standard' label='CPF' type='number'/>
                        <TextField sx={{m: 1, mr: 1}} variant='standard' label='Documento' type='text'/>
                        <TextField sx={{m: 1, mr: 1, width: 300}} variant='standard' label='Nome completo/Razão social' type='text'/>
                        <TextField sx={{m: 1, mr: 1, width: 300}} variant='standard' label='Email' type='email'/>
                        <TextField sx={{m: 1, mr: 1}} variant='standard' label='Data de abertura' type='text'/>
                    </FormSectionBody>
                </FormSection>
                <FormSection>
                    <FormSectionHeader>
                        <Typography variant='h6' ml={1}>Endereço</Typography>
                    </FormSectionHeader>
                    <FormSectionBody>
                        <TextField sx={{m: 1, width: 90}} variant='standard' type='number' label='CEP'/>
                        <TextField sx={{m: 1, width: 250}} variant='standard' label='Endereço'/>
                        <TextField sx={{m: 1, width: 70}} variant='standard' type='number' label='Numero'/>
                        <TextField sx={{m: 1}} variant='standard' label='Complemento'/>
                        <TextField sx={{m: 1}} variant='standard' label='Bairro'/>
                        <Select
                            variant='standard'
                            sx={{m: 3, mb: 0, width:50}}
                            value={ufSelected}
                            onChange={(ev)=>{setSelectedUF(ev.target.value)}}>
                            {uf.map(uf => {
                                return <MenuItem key={uf.id} value={uf.nome}>{uf.sigla}</MenuItem> 
                            })}
                        </Select>
                        <TextField sx={{m: 1, mb: 1}} variant='standard' label='Cidade'/>
                    </FormSectionBody>
                </FormSection>
            </Form>
        </CadastroContainer>
    )

}

export default Cadastro;