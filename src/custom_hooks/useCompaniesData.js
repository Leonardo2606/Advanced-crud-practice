import {useState, useEffect} from 'react';
import { UnidadeFederalApi, cepApi } from '../services/api';
import store from '../redux/store'
import { newCompanyAction } from '../redux/companiesReducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function useCompaniesData() {

    const [federalUnits, setUF] = useState([]);
    useEffect(()=>{
        UnidadeFederalApi.get('estados')
        .then(response=>{setUF(response.data)})
        .catch(error=>console.log(error))
    }, [])

    //////////////////////////////////////////////////////

    function formatDate(data) {
        var tempDate = new Date(data);
        var formattedDate = [tempDate.getDate()+1, tempDate.getMonth()+1, tempDate.getFullYear()].join(' '+'/'+' ');
        return formattedDate
    }
    function newCompany(values) {
        const empresaDadosStorage = {
            ...values
        };
        const name = values.name;
        const email = values.email;
        const cep = values.cep;
        const data = formatDate(values.data);
        const empresaDadosView = { name, email, cep, data};
        return {empresaDadosStorage, empresaDadosView};
    }

    //////////////////////////////////////////////////////

    const todayDate = new Date();
    const formik = useFormik({
        initialValues: {
            cnpj:'',
            document:'',
            name:'',
            email:'',
            data:'',
            cep:'',
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
                .required('Entre uma data válida')
                .max(todayDate, 'Data futura não permitida'),
            ufSelected: Yup
                .string()
                .required('Selecione o Estado'),
            cep: Yup
                .string()
                .min(9, 'Cep precisa ter 8 números')
                .required('Digite um cep')
        }),
        onSubmit: values => {
              store.dispatch(newCompanyAction(newCompany(values)))
        },
    });

    function updateCepInfo(cepInfo) {
        formik.values.address = cepInfo.logradouro;
        formik.values.city = cepInfo.localidade;
        formik.values.neighborhood = cepInfo.bairro;
        formik.values.complement = cepInfo.complemento;
    }

    const [requestedCep, setRequestedCep] = useState({});
    async function requestCep(cepEvent) {
        const cep = cepEvent.target.value;
        try{
            if(cep.length === 9) {
                const response = await cepApi.get(`/${cep}/json`);
                setRequestedCep(response.data);
                updateCepInfo(response.data)
                console.log(requestedCep)
            }
        } catch(err){
            console.log(err);
        } finally {
            return cep
        }
    }

    //////////////////////////////////////////////////////

    function cnpjMask(cnpj) {
        if (cnpj.length <= 18) {  
            cnpj = cnpj.replace(/\D/g, '');
            cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
            cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
            cnpj = cnpj.replace(/(\d{4})(\d)/,"$1-$2");
        } cnpj = cnpj.substring(0,18);
        return cnpj;
    }

    function cepMask(cep) {
        if(cep.length <= 9) {
            cep = cep.replace(/\D/g, '')
            cep = cep.replace(/^(\d{5})(\d)/, "$1-$2")
        } cep = cep.substring(0,9)
        return cep;
    }

    //////////////////////////////////////////////////////



    return [formik, federalUnits, cnpjMask, cepMask, requestCep, requestedCep];

}

export default useCompaniesData;