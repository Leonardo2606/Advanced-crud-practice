import React, {useEffect, useState} from 'react';
import { TextField, Select, MenuItem, InputLabel } from '@mui/material';
import {Form, FormSection, FormSectionHeader, FormSectionBody, FormSectionHeaderTitle} from '../style';
import { UFapi } from '../services/api';

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

        <Form>
            <FormSection>
                <FormSectionHeader><FormSectionHeaderTitle>Cadastrar Empresa</FormSectionHeaderTitle></FormSectionHeader>
                <FormSectionBody>
                    <TextField sx={{m: 1, mr: 1}} variant='standard' label='CPF' type='number'/>
                    <TextField sx={{m: 1, mr: 1}} variant='standard' label='Documento' type='text'/>
                    <TextField sx={{m: 1, mr: 1, width: 300}} variant='standard' label='Nome completo/Razão social' type='text'/>
                    <TextField sx={{m: 1, mr: 1, width: 300}} variant='standard' label='Email' type='email'/>
                    <TextField sx={{m: 1, mr: 1}} variant='standard' label='Data de abertura' type='text'/>
                </FormSectionBody>
            </FormSection>
            <FormSection>
                <FormSectionHeader><FormSectionHeaderTitle>Endereço</FormSectionHeaderTitle></FormSectionHeader>
                <FormSectionBody>
                    <TextField sx={{m: 1, width: 90}} variant='standard' number='number' label='CEP'/>
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

    )

}

export default Cadastro;