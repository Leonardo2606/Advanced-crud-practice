import React, {useState} from 'react';
import { FormControl, FormHelperText, TextField, Select, MenuItem, Typography, IconButton, Tooltip, Button, 
    Alert, Slide, InputLabel } from '@mui/material';
import {Form, FormSection, FormSectionHeader, FormSectionBody, RegisterContainer,
    LinkBox} from '../style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import useMaskAndApi from '../custom_hooks/useMaskAndApi';
import { useDispatch } from 'react-redux';
import { addNewCompany, closeListAlert } from '../redux/companiesReducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [federalUnits, cnpjMask, cepMask, requestCep] = useMaskAndApi();
    
    function formatDate(data) {
        var tempDate = new Date(data);
        var formattedDate = [tempDate.getDate()+1, tempDate.getMonth()+1, tempDate.getFullYear()].join(` / `);
        return formattedDate
    }
    function newCompany(values) {
        return {
            name:values.name,
            email:values.email,
            data:formatDate(values.data),
            cnpj:values.cnpj,
            slogan:values.slogan,
            address:values.address
        }; 
    }

    //////////////////////////////////////////////////////

    const [loadingChecked, setLoadingChecked] = useState(false);
    
    const todayDate = new Date();
    const formik = useFormik({
        initialValues: {
            name:'',
            email:'',
            data:'',
            cnpj:'',
            slogan:'',  
            address:{
                streetAddress:'',
                complement:'',
                neighborhood:'',
                city:'',
                number:'',
                ufSelected:'',
                cep:''
            }
        },
        validationSchema: Yup.object({
            address: Yup.object({
                cep: Yup
                .string()
                .min(9, 'Cep precisa ter 8 números')
                .required('Digite um cep'),
                ufSelected: Yup
                .string()
                .required('Selecione o Estado')
            }),
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
            
        }),
        onSubmit: async (values) => {
            try{
                setLoadingChecked(true);
                await dispatch(addNewCompany(newCompany(values))).unwrap();
                setTimeout(()=>{    
                    dispatch(closeListAlert())
                }, 3000)
                navigate('/');
                setLoadingChecked(false);
            } catch(err) {
                console.error(err);
            }
        },
    });

    function applyCepInfo(cepResponse) {
        formik.setFieldValue('address.streetAddress', cepResponse.logradouro || '');
        formik.setFieldValue('address.neighborhood', cepResponse.bairro || '');
        formik.setFieldValue('address.city', cepResponse.localidade || '');
        formik.setFieldValue('address.complement', cepResponse.complemento || '');
        formik.setFieldValue('address.ufSelected', cepResponse.uf || '');
        formik.setFieldValue('address.number', cepResponse.number || '');
    }

    return (
        <RegisterContainer>
            <Slide direction='down' in={loadingChecked} mountOnEnter unmountOnExit >
                <Alert 
                    severity='success'
                    sx={{
                        width:260,
                        position: 'fixed',
                        left:'40vw',
                        '@media (max-width: 1100px)':{
                            left:'35vw'
                        },
                        '@media (max-width: 820px)':{
                            left:'30vw'
                        },
                        '@media (max-width: 662px)':{
                            left:'14vw'
                        }
                    }}>
                        Loading!
                </Alert>
            </Slide>

            <LinkBox>
                <Link style={{textDecoration: 'none'}} to={'/'}>
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
                    <FormSectionBody style={{paddingBottom:3}}>
                        <TextField 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name ? true : false}
                            helperText={formik.touched.name ? formik.errors.name : null}
                            value={formik.values.name} 
                            sx={{
                                m: 1, 
                                mr: 1,
                                width:'clamp(100%, 300px, 500px)', 
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
                            value={formik.values.slogan}
                            sx={{m: 1}} 
                            name='slogan' 
                            variant='standard' 
                            label='Slogan' 
                            type='text'
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
                                sx={{mt:3}}
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
                                    let cep = await requestCep(e, applyCepInfo)
                                    let maskedCep = cepMask(cep)
                                    formik.setFieldValue('address.cep', maskedCep)
                                } catch(err){console.log(err)}
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.cep}
                            error={formik.touched.address?.cep && formik.errors.address?.cep ? true : false}
                            helperText={formik.touched.address?.cep ? formik.errors.address?.cep : null}
                            required
                            sx={{m: 1, mt:0, width: 90}}
                            name='address.cep'
                            variant='standard' 
                            type='text' 
                            label='CEP'
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={formik.values.address.streetAddress} 
                            name='address.streetAddress' 
                            sx={{m: 1, mt:0, width: 250}} 
                            variant='standard' 
                            label='Endereço'
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={formik.values.address.number} 
                            sx={{m: 1, mt:0, width: 70}} 
                            name='address.number' 
                            variant='standard' 
                            type='number' 
                            label='Numero'
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={formik.values.address.complement} 
                            name='address.complement' 
                            sx={{m: 1, mt:0}} 
                            variant='standard' 
                            label='Complemento'
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.neighborhood}
                            name='address.neighborhood' 
                            sx={{m: 1, mt:0}} 
                            variant='standard' 
                            label='Bairro'
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={formik.values.address.city} 
                            name='address.city' 
                            sx={{m: 1, mt:0, mb: 1}} 
                            variant='standard' 
                            label='Cidade'
                        />
                        <FormControl 
                            error={formik.touched.address?.ufSelected && formik.errors.address?.ufSelected ? true : false}
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
                                name='address.ufSelected'
                                id='ufSelected-Select'
                                value={formik.values.address.ufSelected}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address?.ufSelected && formik.errors.address?.ufSelected ? true : false}>
                                {federalUnits.map(uf => {
                                    return <MenuItem key={uf.id} value={uf.sigla}>{uf.sigla}</MenuItem> 
                                })}
                            </Select>
                            <FormHelperText>{formik.touched.address?.ufSelected ? formik.errors.address?.ufSelected : null}</FormHelperText>
                        </FormControl>
                        
                    </FormSectionBody>
                </FormSection>
            </Form>
        </RegisterContainer>
    )

}

export default Register;