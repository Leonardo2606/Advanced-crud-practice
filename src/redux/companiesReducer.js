import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

///////////////////////////////////////////// Async thunk functions - start///////////////////////////////////////////////////

const companiesURL = 'https://62ae3131645d00a28a05caa1.mockapi.io/companies';

export const getCompanies = createAsyncThunk('companies/getCompanies', async ()=>{
    try {
        const response = await axios.get(companiesURL);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
})
export const addNewCompany = createAsyncThunk('companies/addNewCompany', async (newCompanie) => {
    try {
        const response = await axios.post(companiesURL, newCompanie);
        return response.data;
    } catch (err) {
        console.log(err.message)
    }
} )
export const deleteCompany = createAsyncThunk('companies/deleteCompany', async (id) => {
    try {
        const response = await axios.delete(`${companiesURL}/${id}`);
        return response.data;
    } catch (err) {
        console.log(err.message)
    }
})
export const updateCompany = createAsyncThunk('companies/updateCompany', async (payload) => {
    try {
        const response = await axios.put(`${companiesURL}/${payload.company.id}`, payload.company);
        return payload; /* aqui retorno o payload por conter o index da empresa dentro do state empresasArrayStorage, 
                                                        para substitui-lo pela empresa editada.*/
    } catch (err) {
        console.log(err)
    }
})

///////////////////////////////////////////// Async thunk functions - end ///////////////////////////////////////////////////

const initialState = {
    status: 'idle',
    empresasArrayStorage:[]
}
const companiesSlice = createSlice({
    name: 'companies',
    initialState: initialState,
    reducers: {
        /*newCompanyAction (state, action) {
            state.empresasArrayStorage = [...state.empresasArrayStorage, action.payload.empresaDadosStorage];
            console.log(state.empresasArrayStorage);
        }
        deleteCompanyAction (state, action) {
            state.empresasArrayStorage = state.empresasArrayStorage.filter((empresa, idx) => idx !== action.payload);
        },
        editCompanyAction (state, action) {
            const empresaStorageToBeEdited = state.empresasArrayStorage[action.payload.index];    
            empresaStorageToBeEdited.name = action.payload.valores.name
            empresaStorageToBeEdited.email = action.payload.valores.email
            empresaStorageToBeEdited.data = formatDate(action.payload.valores.data)
            empresaStorageToBeEdited.cnpj = action.payload.valores.cnpj
            empresaStorageToBeEdited.document = action.payload.valores.document
            empresaStorageToBeEdited.address = action.payload.valores.address
            
            state.empresasArrayStorage.splice(action.payload.index, 1, empresaStorageToBeEdited);
        }*/
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompanies.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCompanies.fulfilled, (state, action) => {
                state.status = 'success'
                state.empresasArrayStorage = state.empresasArrayStorage.concat(action.payload);
            })
            .addCase(addNewCompany.fulfilled, (state, action) => {
                state.empresasArrayStorage.push(action.payload);
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.empresasArrayStorage = state.empresasArrayStorage.filter((company) => company.id !== action.payload.id);
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.empresasArrayStorage.splice(action.payload.idx, 1, action.payload.company);
            })
    }
})

//export const {deleteCompanyAction, editCompanyAction} = companiesSlice.actions;
export default companiesSlice.reducer;