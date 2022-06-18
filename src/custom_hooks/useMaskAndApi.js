import {useState, useEffect} from 'react';
import axios from 'axios';



function useMaskAndApi() {
    
    const UnidadeFederalApi = axios.create({
       baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/'
    });
    const cepApi = axios.create({
       baseURL: 'https://viacep.com.br/ws'
    });
    
    const [federalUnits, setUF] = useState([]);
    useEffect(()=>{
        UnidadeFederalApi.get('estados')
        .then(response=>{
            setUF(response.data)
        })
        .catch(error=>console.log(error))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    async function requestCep(cepEvent, applyCepInfo) {
        const cep = cepEvent.target.value;
        try{
            if(cep.length === 9) {
                const response = await cepApi.get(`/${cep}/json`);
                applyCepInfo(response.data)
            }
        } catch(err){
            console.log(err);
        } finally {
            return cep
        }
    }

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

    return [federalUnits, cnpjMask, cepMask, requestCep];

}

export default useMaskAndApi;