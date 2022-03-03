import {useState, useEffect} from 'react';
import { UnidadeFederalApi } from '../services/api';

function useCompaniesData() {

    const [cpf, setCpf] = useState('');
    const [documento, setDocumento] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('Não fornecido');
    const [bairro, setBairro] = useState('');
    const [ufSelected, setSelectedUF] = useState('');

    const [unidadesFederais, setUF] = useState([]);
    useEffect(()=>{
        UnidadeFederalApi.get('estados')
        .then(response=>{setUF(response.data)})
        .catch(error=>console.log(error))
    }, [])

    function novaEmpresa() {
        const empresaDadosStorage = {
            cpf, documento, nome, email, data, cep, endereco,
            numero, complemento, bairro, ufSelected
        };
        const empresaDadosView = { nome, ufSelected, cep, data};
        return {empresaDadosStorage, empresaDadosView};
    }

        return [cpf, setCpf, setDocumento, setNome, setEmail, 
        setData, setCep, setEndereco, setNumero, 
        setComplemento, setBairro, ufSelected, setSelectedUF, unidadesFederais, novaEmpresa];

}

export default useCompaniesData;