import React, {useState} from 'react';
import { FormControl, FormHelperText, TextField, Select, MenuItem, Typography, IconButton, Tooltip, Button, 
    Alert, Slide, InputLabel } from '@mui/material';
import {Form, FormSection, FormSectionHeader, FormSectionBody, RegisterContainer,
    LinkBox} from '../style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import useMaskAndApi from '../custom_hooks/useMaskAndApi';
import store from '../redux/store'
import { newCompanyAction } from '../redux/companiesReducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {

    const [federalUnits, cnpjMask, cepMask, requestCep, requestedCep] = useMaskAndApi()
    
    function formatDate(data) {
        var tempDate = new Date(data);
        var formattedDate = [tempDate.getDate()+1, tempDate.getMonth()+1, tempDate.getFullYear()].join(` / `);
        return formattedDate
    }
    function newCompany(values) {
        const empresaDadosStorage = {
            name:values.name,
            email:values.email,
            cep:values.cep,
            data:formatDate(values.data),
            cnpj:values.cnpj,
            document:values.document,
            address:values.address,
            number:values.number,
            complement:values.complement,
            neighborhood:values.neighborhood,
            ufSelected:values.ufSelected,
            city:values.city,
        }; 
        return {empresaDadosStorage};
    }

    //////////////////////////////////////////////////////

    const todayDate = new Date();
    const [checked, setChecked] = useState(false);
    function handleSuccessAlert(){
        setChecked(prev => !prev)
        setTimeout(()=>{
            setChecked(prev => !prev)
        }, 4000) 
    }

    const formik = useFormik({
        initialValues: {
            name:'',
            email:'',
            cep:'',
            data:'',
            cnpj:'',
            document:'',
            address:'',
            number:'',
            complement:'',
            neighborhood:'',
            ufSelected:'',
            city:'',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Email inválido')
                .required('Escreva um email válido'),
            cnpj: Yup
                .string()
                .length(18,'CNPJ precisa ter 14 números')
                .required('Requerido'),
            name: Yup
                .string()
                .max(50, 'Nome da empresa não pode ter mais do que 50 caracteres')
                .required('Escreva o nome da empresa'),
            data: Yup
                .date()
                .max(todayDate, 'Data futura não permitida')
                .required('Entre uma data válida'),
            ufSelected: Yup
                .string()
                .required('Selecione o Estado'),
            cep: Yup
                .string()
                .min(9, 'Cep precisa ter 8 números')
                .required('Digite um cep')
        }),
        onSubmit: (values) => {
                values.address = requestedCep.logradouro;
                values.neighborhood = requestedCep.bairro;
                values.city = requestedCep.localidade;
                values.complement = requestedCep.complemento;
                store.dispatch(newCompanyAction(newCompany(values)));
                handleSuccessAlert();
        },
    });

    return (
        <RegisterContainer>
            <Slide direction='down' in={checked} mountOnEnter unmountOnExit >
                <Alert 
                    severity='success'
                    sx={{
                        width:260,
                        position:'fixed',
                        left:'40vw',
                        '@media (max-width: 1100px)':{
                            left:'35vw'
                        },
                        '@media (max-width: 820px)':{
                            left:'30vw'
                        },
                        '@media (max-width: 662px)':{
                            left:'21vw'
                        }
                    }}>
                        Empresa cadastrada com sucesso!
                </Alert>
            </Slide>

            <LinkBox>
                <Link style={{textDecoration: 'none'}} to={'/List'}>
                    <Typography  
                        color={'white'} 
                        variant='p'>
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
            </LinkBox>
            
            <Form onSubmit={formik.handleSubmit}>
                <FormSection>
                    <FormSectionHeader>
                        <Typography 
                            variant='h6' 
                            ml={1}>
                                Cadastrar Empresa
                        </Typography>
                        <Button 
                            type='submit'
                            sx={{mr:2}} 
                            variant='contained'>
                                Salvar
                        </Button>
                    </FormSectionHeader>
                    <FormSectionBody>
                        <TextField 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name ? true : false}
                            helperText={formik.touched.name ? formik.errors.name : null}
                            value={formik.values.name} 
                            sx={{
                                m: 1, 
                                mr: 1,
                                width:300, 
                                '@media(max-width:662px)':{width:'100%'}
                            }} 
                            required 
                            name='name' 
                            variant='standard' 
                            label='Nome completo/Razão social' 
                            type='text'
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formik.touched.email && formik.errors.email ? true : false}
                            helperText={formik.touched.email ? formik.errors.email : null}
                            required
                            name='email' 
                            sx={{
                                m: 1, 
                                mr: 1, 
                                width:300, 
                                '@media(max-width:662px)':{width:'100%'}
                            }} 
                            variant='standard' 
                            label='Email' 
                            type='email'
                        />
                        <TextField 
                            onChange={e=>{
                                formik.setValues(prevValues => ({
                                    ...prevValues,
                                    [e.target.name]: cnpjMask(e.target.value)
                                }))
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.cnpj}
                            error={formik.touched.cnpj && formik.errors.cnpj ? true : false}
                            helperText={formik.touched.cnpj ? formik.errors.cnpj : null} 
                            required
                            sx={{m: 1, mr: 1}}
                            name='cnpj' 
                            variant='standard' 
                            label='CNPJ'
                            type='text'
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={formik.values.document}
                            sx={{m: 1}} 
                            name='document' 
                            variant='standard' 
                            label='Documento' 
                            type='file'
                        />
                        <InputLabel 
                            sx={{display:'flex', alignItems:'center', width:300}}
                            onBlur={formik.handleBlur}
                            error={formik.touched.data && formik.errors.data ? true : false}
                            >
                                Data de abertura
                            <TextField 
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.data}
                                error={formik.touched.data && formik.errors.data ? true : false}
                                helperText={formik.touched.data ? formik.errors.data : null} 
                                required
                                name='data'  
                                variant='standard'
                                type='date'
                                sx={{m:1}}
                            />
                        </InputLabel>
                    </FormSectionBody>
                </FormSection>
                <FormSection>
                    <FormSectionHeader>
                        <Typography 
                            variant='h6' 
                            ml={1}>
                                Endereço
                        </Typography>
                    </FormSectionHeader>
                    <FormSectionBody>
                        <TextField 
                            onChange={async e=>{
                                try {
                                    let cep = await requestCep(e)
                                    let maskedCep = cepMask(cep)
                                    formik.setValues(prevValues => ({
                                        ...prevValues,
                                        [e.target.name]: maskedCep
                                    }))
                                } catch(err){console.log(err)}
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.cep}
                            error={formik.touched.cep && formik.errors.cep ? true : false}
                            helperText={formik.touched.cep ? formik.errors.cep : null}
                            required
                            sx={{m: 1, mt:0, width: 90}}
                            name='cep'
                            variant='standard' 
                            type='text' 
                            label='CEP'
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={requestedCep.logradouro ? requestedCep.logradouro : formik.values.address} 
                            name='address' 
                            sx={{m: 1, mt:0, width: 250}} 
                            variant='standard' 
                            label='Endereço'
                            InputLabelProps={{shrink: formik.values.address || requestedCep.logradouro ?true:false}}
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={formik.values.number} 
                            sx={{m: 1, mt:0, width: 70}} 
                            name='number' 
                            variant='standard' 
                            type='number' 
                            label='Numero'
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={requestedCep.complemento ? requestedCep.complemento : formik.values.complement} 
                            name='complement' 
                            sx={{m: 1, mt:0}} 
                            variant='standard' 
                            label='Complemento'
                            InputLabelProps={{shrink: formik.values.complement || requestedCep.complemento ?true:false}}
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={requestedCep.bairro ? requestedCep.bairro : formik.values.neighborhood}
                            name='neighborhood' 
                            sx={{m: 1, mt:0}} 
                            variant='standard' 
                            label='Bairro'
                            InputLabelProps={{shrink: formik.values.neighborhood || requestedCep.bairro ?true:false}}
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={requestedCep.localidade ? requestedCep.localidade : formik.values.city} 
                            name='city' 
                            sx={{m: 1, mt:0, mb: 1}} 
                            variant='standard' 
                            label='Cidade'
                            InputLabelProps={{shrink: formik.values.city || requestedCep.localidade ?true:false}}
                        />
                        <FormControl 
                            error={formik.touched.ufSelected && formik.errors.ufSelected ? true : false}
                            variant='standard'
                            sx={{mt:1,minWidth:200}}>
                            <InputLabel 
                                required
                                id='ufSelected-Select'
                            >
                                Estado:
                            </InputLabel>
                            <Select
                                required
                                variant='standard'
                                sx={{width:90}}
                                name='ufSelected'
                                id='ufSelected-Select'
                                value={formik.values.ufSelected}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.ufSelected && formik.errors.ufSelected ? true : false}>
                                {federalUnits.map(uf => {
                                    return <MenuItem key={uf.id} value={uf.nome}>{uf.sigla}</MenuItem> 
                                })}
                            </Select>
                            <FormHelperText>{formik.touched.ufSelected ? formik.errors.ufSelected : null}</FormHelperText>
                        </FormControl>
                        
                    </FormSectionBody>
                </FormSection>
            </Form>
        </RegisterContainer>
    )

}

export default Register;