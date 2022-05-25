import React, {useState} from 'react';
import { FormControl, FormHelperText, TextField, Select, MenuItem, Typography, IconButton, Tooltip, Button, 
    Alert, Slide, InputLabel } from '@mui/material';
import {Form, FormSection, FormSectionHeader, FormSectionBody, RegisterContainer,
    LinkBox} from '../style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import useCompaniesData from '../custom_hooks/useCompaniesData';

const Register = () => {

    const [formik, federalUnits, cnpjMask, cepMask, requestCep, requestedCep] = useCompaniesData();

    const [checked, setChecked] = useState(false);
    function handleAlertChange() {
        setChecked(prev => !prev)
        setTimeout(()=>{
            setChecked(prev => !prev)
        }, 5000)
    }

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
            
            


            <Form onSubmit={e=>{
                e.preventDefault();
                formik.handleSubmit();
                handleAlertChange();
            }}>
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
                                let maskedCnpj = cnpjMask(e.target.value)
                                formik.setValues(prevValues => ({
                                    ...prevValues,
                                    [e.target.name]: maskedCnpj
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
                            required 
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
                            value={formik.values.address} 
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
                            value={formik.values.complement} 
                            name='complement' 
                            sx={{m: 1, mt:0}} 
                            variant='standard' 
                            label='Complemento'
                            InputLabelProps={{shrink: formik.values.complement || requestedCep.complemento ?true:false}}
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.neighborhood}
                            name='neighborhood' 
                            sx={{m: 1, mt:0}} 
                            variant='standard' 
                            label='Bairro'
                            InputLabelProps={{shrink: formik.values.neighborhood || requestedCep.bairro ?true:false}}
                        />
                        <TextField 
                            onChange={formik.handleChange}
                            value={formik.values.city} 
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