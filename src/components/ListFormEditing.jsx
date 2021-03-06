import React from 'react';
import useMaskAndApi from '../custom_hooks/useMaskAndApi';
import { useDispatch } from 'react-redux';
import { updateCompany, closeListAlert } from '../redux/companiesReducer';
import { FormControl, TextField, Select, MenuItem, 
    Tooltip, InputLabel, Slide, Paper, Button } from '@mui/material';
import { ListFormEdit } from '../style';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ListFormEditing = ({editingSwitch, onOrOff, empresa, idx, editedRow}) => {

    const dispatch = useDispatch();
    const [federalUnits, cnpjMask, cepMask, requestCep] = useMaskAndApi();

    function formatDate(data) {
        var tempDate = new Date(data);
        var formattedDate = [tempDate.getDate()+1, tempDate.getMonth()+1, tempDate.getFullYear()].join(` / `);
        return formattedDate
    }
    function companyUpdated(values) {
        return {
            id:values.id,
            name:values.name,
            email:values.email,
            data:formatDate(values.data),
            cnpj:values.cnpj,
            slogan:values.slogan,
            address:values.address
        }; 
    }

    const todayDate = new Date();
    const listFormik = useFormik({
        enableReinitialize:true,
        initialValues: {
            id:empresa.id,
            name:empresa.name,
            email:empresa.email,
            data:empresa.data,
            cnpj:empresa.cnpj,
            slogan:empresa.slogan,
            address:{
                streetAddress:empresa.address?.streetAddress,
                complement:empresa.address?.complement,
                neighborhood:empresa.address?.neighborhood,
                city:empresa.address?.city,
                number:empresa.address?.number,
                ufSelected:empresa.address?.ufSelected,
                cep:empresa.address?.cep
            }
        },
        validationSchema: Yup.object({
            address: Yup.object({
                cep: Yup
                .string()
                .min(9, 'Cep precisa ter 8 n??meros')
                .required('Digite um cep')
            }),
            email: Yup
                .string()
                .email('Email inv??lido')
                .required('Escreva um email v??lido'),
            cnpj: Yup
                .string()
                .length(18,'CNPJ precisa ter 14 n??meros')
                .required('Requerido'),
            name: Yup
                .string()
                .max(50, 'Nome da empresa n??o pode ter mais do que 50 caracteres')
                .required('Escreva o nome da empresa'),
            data: Yup
                .date()
                .max(todayDate, 'Data futura n??o permitida')
                .required('Entre uma data v??lida')
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(updateCompany({company:companyUpdated(values), idx})).unwrap();
                setTimeout(()=>{
                    dispatch(closeListAlert());
                }, 3000)
                editingSwitch();
            } catch (err) {
                console.log(err);
            }     
        },
    });

    function applyCepInfoList(cepResponse) {
        listFormik.setFieldValue('address.streetAddress', cepResponse.logradouro || '');
        listFormik.setFieldValue('address.neighborhood', cepResponse.bairro || '');
        listFormik.setFieldValue('address.city', cepResponse.localidade || '');
        listFormik.setFieldValue('address.complement', cepResponse.complemento || '');
        listFormik.setFieldValue('address.ufSelected', cepResponse.uf || '');
        listFormik.setFieldValue('address.number', cepResponse.number || '');
    }

    

    return (
        <Slide 
            onEnter={(e)=>{
                e.scrollIntoView({block:'center'})
            }} 
            onExit={()=>{
                editedRow.current.children[idx].scrollIntoView({block:'center', behavior:'smooth'});
                editedRow.current.children[idx].style.animation = 'bgC 4s'
                setTimeout(()=>{
                    editedRow.current.children[idx].style.animationName = ''
                }, 4000)
            }} direction='down' in={onOrOff} mountOnEnter unmountOnExit>
            <Paper 
                elevation={5}
                sx={{
                    width:'clamp(350px, 60%, 98%)',
                    m:'auto',
                    mb:10,
                    pt:1,
                    pb:2,
                    gridRowStart: 1,
                    gridColumnStart: 1,
                }}
            >
            <ListFormEdit onSubmit={(e)=>{
                    e.preventDefault();
                    listFormik.handleSubmit();
                }}>
                <TextField 
                    type='text'
                    name='name'
                    label='Nome da empresa'
                    sx={{margin:1, gridColumnStart:1, gridColumnEnd:3}}
                    value={listFormik.values.name}
                    onChange={listFormik.handleChange}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.name ? true : false}
                    helperText={listFormik.errors.name ? listFormik.errors.name : null}
                />
                <TextField 
                    type='email'
                    name='email'
                    label='Email'
                    sx={{margin:1, gridColumnStart:1, gridColumnEnd:3}}
                    value={listFormik.values.email}
                    onChange={listFormik.handleChange}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.email ? true : false}
                    helperText={listFormik.errors.email ? listFormik.errors.email : null}
                />
                <TextField 
                    type='text'
                    name='cnpj'
                    label='CNPJ'
                    sx={{margin:1}}
                    value={listFormik.values.cnpj}
                    onChange={(e)=>{
                        listFormik.setValues(prevValues => ({
                            ...prevValues,
                            [e.target.name]:cnpjMask(e.target.value)
                        }))
                    }}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.cnpj ? true : false}
                    helperText={listFormik.errors.cnpj ? listFormik.errors.cnpj : null}
                />
                <TextField 
                    type='text'
                    name='slogan'
                    label='Slogan'
                    sx={{margin:1}} 
                    value={listFormik.values.slogan}
                    onChange={listFormik.handleChange}
                />
                <TextField 
                    type='date'
                    name='data'
                    label={`Data pr??via: ${empresa.data ? empresa.data.split('-').reverse().join('/') : ''}`}
                    sx={{margin:1}}
                    InputLabelProps={{shrink:true}}
                    value={listFormik.values.data}
                    onChange={listFormik.handleChange}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.data ? true : false}
                    helperText={listFormik.errors.data ? listFormik.errors.data : null}
                />
                <TextField
                    sx={{margin:1}}
                    type='text'
                    name='address.cep'
                    label='CEP'
                    value={listFormik.values.address.cep}
                    onChange={async e=>{
                        try {
                            let cep = await requestCep(e, applyCepInfoList)
                            let maskedCep = cepMask(cep)
                            listFormik.setFieldValue('address.cep', maskedCep)
                        } catch(err){console.log(err)}
                    }}
                    onBlur={listFormik.handleBlur}
                    error={listFormik.errors.address?.cep ? true : false}
                    helperText={listFormik.errors.address?.cep ? listFormik.errors.address?.cep : null} 
                    
                />
                <TextField
                    sx={{margin:1}}
                    type='text'
                    name='address.streetAddress'
                    label='Endere??o'
                    value={listFormik.values.address.streetAddress}
                    onChange={listFormik.handleChange}
                />
                <TextField
                    sx={{margin:1}} 
                    type='number'
                    name='address.number'
                    label='N??mero'
                    value={listFormik.values.address.number}
                    onChange={listFormik.handleChange}
                />
                <TextField
                    sx={{margin:1}} 
                    type='text'
                    name='address.complement'
                    label='Complemento'
                    value={listFormik.values.address.complement}
                    onChange={listFormik.handleChange}
                />
                <TextField
                    sx={{margin:1}} 
                    type='text'
                    name='address.neighborhood'
                    label='Bairro'
                    value={listFormik.values.address.neighborhood}
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
                            name='address.ufSelected'
                            id='ufSelected-Select'
                            value={listFormik.values.address.ufSelected}
                            onChange={listFormik.handleChange}
                        >
                            {federalUnits.map(uf => {
                                return <MenuItem key={uf.id} value={uf.sigla}>{uf.sigla}</MenuItem> 
                            })}
                        </Select>
                </FormControl>
                <TextField
                sx={{margin:1, pb:1}} 
                    type='text'
                    name='address.city'
                    label='Cidade'
                    value={listFormik.values.address.city}
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
                    type='submit'
                    disabled={listFormik.isValid === true ? false : true}
                >
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
                    editingSwitch();
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