import axios from 'axios';

export const UnidadeFederalApi = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/'
});