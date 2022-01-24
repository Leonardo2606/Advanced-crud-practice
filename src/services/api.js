import axios from 'axios';

export const UFapi = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/'
});