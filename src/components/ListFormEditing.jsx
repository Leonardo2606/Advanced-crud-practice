import React from 'react';
import useMaskAndApi from '../custom_hooks/useMaskAndApi';
import { useDispatch } from 'react-redux';
import { editCompanyAction } from '../redux/companiesReducer';
import { FormControl, TextField, Select, MenuItem, 
    Tooltip, InputLabel, Slide, Paper, Button } from '@mui/material';
import { ListFormEdit } from '../style';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFormik } from 'formik';
import * as Yup from 'yup';




const ListFormEditing = ({closeDialogFunc, onOrOff, empresa, idx}) => {

    const dispatch = useDispatch();
    const [federalUnits, cnpjMask, cepMask, requestCep, requestedCep] = useMaskAndApi();

    const todayDate = new Date();
    const listFormik = useFormik({
        enableReinitialize:true,
        initialValues: {
            name:empresa.name,
            email:empresa.email,
            cep:empresa.cep,
            data:empresa.data,
            cnpj:empresa.cnpj,
            document:empresa.document,
            address:empresa.address,
            number:empresa.number,
            complement:empresa.complement,
            neighborhood:empresa.neighborhood,
            ufSelected:empresa.ufSelected,
            city:empresa.city
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
                dispatch(editCompanyAction({valores:values, index:idx}));
                closeDialogFunc();
        },
    });


    return (
        <Slide direction='down' in={onOrOff} mountOnEnter unmountOnExit>
            <Paper 
                elevation={5}
                sx={{
                    width:'50%', 
                    m:'auto',
                    mb:10,
                    pt:1,
                    pb:2,
                    gridRowStart: 1,
                    gridColumnStart: 1
                }}
            >
            <ListFormEdit onSubmit={(e)=>{
                    e.preventDefault();
                    listFormik.handleSubmit();
                }}>
                <TextField 
                    type='text'
                    name='name'
                    sx={{margin:1, gridColumnStart:1, gridColumnEnd:3}}
                    value={listFormik.values.name}
                    onChange={listFormik.handleChange}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.name && listFormik.touched.name ? true : false}
                    helperText={listFormik.touched ? listFormik.errors.name : null}
                />
                <TextField 
                    type='email'
                    name='email'
                    sx={{margin:1, gridColumnStart:1, gridColumnEnd:3}}
                    value={listFormik.values.email}
                    onChange={listFormik.handleChange}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.email && listFormik.touched.email ? true : false}
                    helperText={listFormik.touched ? listFormik.errors.email : null}
                />
                <TextField 
                    type='text'
                    name='cnpj'
                    sx={{margin:1}}
                    value={listFormik.values.cnpj}
                    onChange={(e)=>{
                        listFormik.setValues(prevValues => ({
                            ...prevValues,
                            [e.target.name]:cnpjMask(e.target.value)
                        }))
                    }}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.cnpj && listFormik.touched.cnpj ? true : false}
                    helperText={listFormik.touched ? listFormik.errors.cnpj : null}
                />
                <TextField 
                    type='text'
                    name='document'
                    sx={{margin:1}} 
                    value={listFormik.values.document}
                    onChange={listFormik.handleChange}
                />
                <TextField 
                    type='date'
                    name='data'
                    label={`Data prévia: ${empresa.data ? empresa.data.split('-').reverse().join('/') : ''}`}
                    sx={{margin:1}}
                    InputLabelProps={{shrink:true}}
                    value={listFormik.values.data}
                    onChange={listFormik.handleChange}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.data && listFormik.touched.data ? true : false}
                    helperText={listFormik.touched.data ? listFormik.errors.data : null}
                />
                <TextField
                    sx={{margin:1}}
                    type='text'
                    name='cep'
                    value={listFormik.values.cep}
                    onChange={async e=>{
                        try {
                            let cep = await requestCep(e)
                            let maskedCep = cepMask(cep)
                            listFormik.setValues(prevValues => ({
                                ...prevValues,
                                [e.target.name]: maskedCep
                            }))
                        } catch(err){console.log(err)}
                    }}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.cep && listFormik.touched.cep ? true : false}
                    helperText={listFormik.touched.cep ? listFormik.errors.cep : null} 
                />
                <TextField
                    sx={{margin:1}}
                    type='text'
                    name='address'
                    value={requestedCep.logradouro ? requestedCep.logradouro : listFormik.values.address}
                    onChange={listFormik.handleChange}
                />
                <TextField
                    sx={{margin:1}} 
                    type='number'
                    name='number'
                    value={listFormik.values.number}
                    onChange={listFormik.handleChange}
                />
                <TextField
                    sx={{margin:1}} 
                    type='text'
                    name='complement'
                    value={requestedCep.complemento ? requestedCep.complemento : listFormik.values.complement}
                    onChange={listFormik.handleChange}
                />
                <TextField
                    sx={{margin:1}} 
                    type='text'
                    name='neighborhood'
                    value={requestedCep.bairro ? requestedCep.bairro : listFormik.values.neighborhood}
                    onChange={listFormik.handleChange}
                />
                <FormControl 
                        variant='standard'
                        sx={{margin:1, pl:7, pb:1, minWidth:200}}>
                        <InputLabel 
                            id='ufSelected-Select'
                            sx={{pl:9}}
                        >
                            Estado:
                        </InputLabel>
                        <Select
                            variant='standard'
                            sx={{width:90}}
                            name='ufSelected'
                            id='ufSelected-Select'
                            value={listFormik.values.ufSelected}
                            onChange={listFormik.handleChange}
                            onBlur={listFormik.handleBlur}
                            error={listFormik.errors.ufSelected && listFormik.touched.ufSelected ? true : false}
                            helperText={listFormik.touched ? listFormik.errors.ufSelected : null}
                        >
                            {federalUnits.map(uf => {
                                return <MenuItem key={uf.id} value={uf.nome}>{uf.sigla}</MenuItem> 
                            })}
                        </Select>
                </FormControl>
                <TextField
                sx={{margin:1, pb:1}} 
                    type='text'
                    name='city'
                    value={requestedCep.localidade ? requestedCep.localidade : listFormik.values.city}
                    onChange={listFormik.handleChange}
                />
                <Button 
                    sx={{
                        width: 150,
                        height: 50,
                        p:1,
                        m:'auto'
                    }}
                    variant='contained'
                    type='submit'>
                    <Tooltip 
                        sx={{width:'100%', borderRadius:0}} 
                        title='Salvar'>
                            <SaveIcon/>
                    </Tooltip>
                </Button>
                <Button 
                    sx={{
                        width: 150,
                        height: 50,
                        p:1,
                        m:'auto'
                    }}
                    variant='contained'
                    color='error'
                    onClick={()=>{
                    listFormik.setValues(()=>({...empresa}));
                    closeDialogFunc();
                    }}>
                    <Tooltip 
                        sx={{width:'100%', borderRadius:0}}
                        title='Cancelar'>
                            <CancelIcon />
                    </Tooltip>    
                </Button>
                
            </ListFormEdit>
            </Paper>
        </Slide>
        
    )

}

export default ListFormEditing;