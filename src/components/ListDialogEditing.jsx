import React, {useState} from 'react';
import useCompaniesData from '../custom_hooks/useCompaniesData';
import { useDispatch } from 'react-redux';
import { editCompanyAction } from '../redux/companiesReducer';
import { FormControl, TextField, Select, MenuItem, 
    IconButton, Tooltip, InputLabel, Slide } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const ListDialogEditing = ({closeDialogFunc, onOrOff, empresa, idx}) => {

    const dispatch = useDispatch();
    const [formik, federalUnits, cnpjMask, cepMask, requestCep, requestedCep, checked] = useCompaniesData();

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
                
                console.log(values);
        },
    });


    return (
        
        <Dialog open={onOrOff}>
            <DialogTitle>
                Editar dados da empresa
            </DialogTitle>
                <DialogContent sx={{display:'grid', gridTemplateColumns:'49% 49%'}}>
                    <TextField 
                        type='text'
                        name='name'
                        sx={{margin:1, gridColumnStart:1, gridColumnEnd:3}}
                        value={listFormik.values.name}
                        onChange={listFormik.handleChange}
                    />
                    <TextField 
                        type='email'
                        name='email'
                        sx={{margin:1, gridColumnStart:1, gridColumnEnd:3}}
                        value={listFormik.values.email}
                        onChange={listFormik.handleChange}
                    />
                    <TextField 
                        type='text'
                        name='cnpj'
                        sx={{margin:1}}
                        value={listFormik.values.cnpj}
                        onChange={listFormik.handleChange}
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
                        label={`Data prévia: ${empresa.data}`}
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
                    />
                    <TextField
                        sx={{margin:1}}
                        type='text'
                        name='address'
                        value={listFormik.values.address}
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
                        value={listFormik.values.complement}
                        onChange={listFormik.handleChange}
                    />
                    <TextField
                        sx={{margin:1}} 
                        type='text'
                        name='neighborhood'
                        value={listFormik.values.neighborhood}
                        onChange={listFormik.handleChange}
                    />
                    <FormControl 
                            variant='standard'
                            sx={{margin:1, pl:7, minWidth:200}}>
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
                            >
                                {federalUnits.map(uf => {
                                    return <MenuItem key={uf.id} value={uf.nome}>{uf.sigla}</MenuItem> 
                                })}
                            </Select>
                    </FormControl>
                    <TextField
                    sx={{margin:1}} 
                        type='text'
                        name='city'
                        value={listFormik.values.city}
                        onChange={listFormik.handleChange}
                    />
                </DialogContent>
            <DialogActions>
            <Tooltip title='Salvar'>
                <IconButton onClick={()=>{
                    dispatch(editCompanyAction({valores:listFormik.values, index:idx}));
                    closeDialogFunc();
                }}
                >
                    <SaveIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title='Cancelar'>
                <IconButton onClick={()=>{
                    listFormik.setValues(()=>({...empresa}));
                    closeDialogFunc();
                }}>
                    <CancelIcon />
                </IconButton>
            </Tooltip>
            </DialogActions>
        </Dialog>
    )

}

export default ListDialogEditing;