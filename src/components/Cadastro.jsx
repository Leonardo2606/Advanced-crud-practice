import React from 'react';
import { TextField, Select, MenuItem, InputLabel } from '@mui/material';
import {Form, FormSection, FormSectionHeader, FormSectionBody, FormSectionHeaderTitle} from '../style';

const Cadastro = () => {

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
                        sx={{m: 3, mb: 0, width:50}}>
                        <MenuItem value={'Ceará'}>CE</MenuItem>    
                    </Select>
                    <TextField sx={{m: 1, mb: 1}} variant='standard' label='Cidade'/>
                </FormSectionBody>
            </FormSection>
        </Form>

    )

}

export default Cadastro;