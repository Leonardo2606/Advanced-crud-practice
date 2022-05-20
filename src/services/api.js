import axios from 'axios';

export const UnidadeFederalApi = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/'
});

export const cepApi = axios.create({
    baseURL: 'https://viacep.com.br/ws'
});