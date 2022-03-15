import React from 'react';
import { TextField, Select, MenuItem, Typography, IconButton, Tooltip, Button } from '@mui/material';
import {Form, FormSection, FormSectionHeader, FormSectionBody, RegisterContainer,
} from '../style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import useCompaniesData from '../custom_hooks/useCompaniesData';
import useValidateData from '../custom_hooks/useValidateData';
import store from '../redux/store'
import { newCompanyAction } from '../redux/companiesReducer';

const Register = () => {

    const [cpf, setCpf, setDocument, setName, setEmail, setData, setCep, setAddress, setNumber, 
        setComplement, setNeighborhood, ufSelected, setSelectedUF, federalUnits, newCompany] = useCompaniesData();
    const allValidations = { 
        cpf: (value) => {
            if(value.length != 11) return {cpf:{valid:true, text:'CPF inválido'}};
            else return {cpf:{valid:false, text:''}};
        }
    }
    const [erros, validarDado] = useValidateData(allValidations);

    return (
        <RegisterContainer>
            <Link style={{textDecoration: 'none'}} to={'/List'}>
                <Typography 
                    fontWeight={'300'} 
                    color={'white'} 
                    variant='button' 
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
            
            <Form onSubmit={ev=>{
                ev.preventDefault();
                store.dispatch(newCompanyAction(newCompany()));}}>
                <FormSection>
                    <FormSectionHeader>
                        <Typography variant='h6' ml={1}>Cadastrar Empresa</Typography>
                        <Button type='submit' sx={{mr:2}} variant='contained'>Salvar</Button>
                    </FormSectionHeader>
                    <FormSectionBody>
                        <TextField 
                            helperText={erros.cpf.text}
                            error={erros.cpf.valid} 
                            onChange={ev=>{if(ev.target.value.length > 11){ev.target.value.substring(0,11)} else setCpf(ev.target.value)}}
                            onBlur={validarDado}
                            value={cpf} 
                            sx={{m: 1, mr: 1}}
                            name='cpf' 
                            variant='standard' 
                            label='CPF' 
                            type='number'/>
                        <TextField onChange={ev=>setDocument(ev.target.value)} sx={{m: 1, mr: 1}} variant='standard' label='Documento' type='text'/>
                        <TextField required onChange={ev=>setName(ev.target.value)} sx={{m: 1, mr: 1, width: 300}} variant='standard' label='Nome completo/Razão social' type='text'/>
                        <TextField onChange={ev=>setEmail(ev.target.value)} sx={{m: 1, mr: 1, width: 300}} variant='standard' label='Email' type='email'/>
                        <TextField onChange={ev=>setData(ev.target.value)} sx={{m: 1, mr: 1}} variant='standard' label='Data de abertura' type='text'/>
                    </FormSectionBody>
                </FormSection>
                <FormSection>
                    <FormSectionHeader>
                        <Typography variant='h6' ml={1}>Endereço</Typography>
                    </FormSectionHeader>
                    <FormSectionBody>
                        <TextField 
                            onChange={ev=>setCep(ev.target.value)}
                            sx={{m: 1, width: 90}}
                            variant='standard' 
                            type='number' 
                            label='CEP'/>
                        <TextField onChange={ev=>setAddress(ev.target.value)} sx={{m: 1, width: 250}} variant='standard' label='Endereço'/>
                        <TextField onChange={ev=>setNumber(ev.target.value)} sx={{m: 1, width: 70}} variant='standard' type='number' label='Numero'/>
                        <TextField onChange={ev=>setComplement(ev.target.value)} sx={{m: 1}} variant='standard' label='Complemento'/>
                        <TextField onChange={ev=>setNeighborhood(ev.target.value)} sx={{m: 1}} variant='standard' label='Bairro'/>
                        <Select
                            variant='standard'
                            sx={{m: 3, mb: 0, width:50}}
                            value={ufSelected}
                            onChange={(ev)=>{setSelectedUF(ev.target.value)}}>
                            {federalUnits.map(uf => {
                                return <MenuItem key={uf.id} value={uf.nome}>{uf.sigla}</MenuItem> 
                            })}
                        </Select>
                        <TextField sx={{m: 1, mb: 1}} variant='standard' label='Cidade'/>
                    </FormSectionBody>
                </FormSection>
            </Form>
        </RegisterContainer>
    )

}

export default Register;