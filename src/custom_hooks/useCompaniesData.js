import {useState, useEffect} from 'react';
import { UnidadeFederalApi } from '../services/api';

function useCompaniesData() {

    const [cpf, setCpf] = useState('');
    const [document, setDocument] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('Não fornecido');
    const [neighborhood, setNeighborhood] = useState('');
    const [ufSelected, setSelectedUF] = useState('');

    const [federalUnits, setUF] = useState([]);
    useEffect(()=>{
        UnidadeFederalApi.get('estados')
        .then(response=>{setUF(response.data)})
        .catch(error=>console.log(error))
    }, [])

    function newCompany() {
        const empresaDadosStorage = {
            cpf, document, name, email, data, cep, address,
            number, complement, neighborhood, ufSelected
        };
        const empresaDadosView = { name, ufSelected, cep, data};
        return {empresaDadosStorage, empresaDadosView};
    }

        return [cpf, setCpf, setDocument, setName, setEmail, 
        setData, setCep, setAddress, setNumber, 
        setComplement, setNeighborhood, ufSelected, setSelectedUF, federalUnits, newCompany];

}

export default useCompaniesData;