// Off for now...


/*import {useState} from 'react';
import store from '../redux/store'
import { newCompanyAction } from '../redux/companiesReducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useMaskAndApi from './useMaskAndApi';

function useCompaniesData() {

    const [federalUnits, cnpjMask, cepMask, requestCep, requestedCep] = useMaskAndApi();

    function formatDate(data) {
        var tempDate = new Date(data);
        var formattedDate = [tempDate.getDate()+1, tempDate.getMonth()+1, tempDate.getFullYear()].join(' '+'/'+' ');
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
                values.city = requestedCep.localidade
                store.dispatch(newCompanyAction(newCompany(values)));
                handleSuccessAlert();
        },
    });

    return [formik, checked];

}

export default useCompaniesData;*/