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
        await axios.put(`${companiesURL}/${payload.company.id}`, payload.company);
        return payload;      // here the payload is returned because he contains the index of the company that is inside 
    } catch (err) {          // the state empresasArrayStorage so it can be used to replace the old company with the edited company in the redux state.
        console.log(err)    
}                                                  
})

///////////////////////////////////////////// Async thunk functions - end ///////////////////////////////////////////////////

const initialState = {
    status: 'idle',
    editingStatus:'idle',
    listAlert: false,
    empresasArrayStorage:[]
}
const companiesSlice = createSlice({
    name: 'companies',
    initialState: initialState,
    reducers: {
        closeListAlert (state, action) {
            state.listAlert = false
            state.editingStatus = 'idle'
        }
        /*
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
                state.empresasArrayStorage = state.empresasArrayStorage.concat(action.payload);
                state.status = 'success'
            })
            .addCase(addNewCompany.fulfilled, (state, action) => {
                state.empresasArrayStorage.push(action.payload);
                state.listAlert = true
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.empresasArrayStorage = state.empresasArrayStorage.filter((company) => company.id !== action.payload.id);
            })
            .addCase(updateCompany.pending, (state, action) => {
                state.editingStatus = 'loading'
                state.listAlert = true
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.empresasArrayStorage.splice(action.payload.idx, 1, action.payload.company);  // the idx(index) it's used here.
                state.editingStatus = 'success'
            })
    }
})

export const {closeListAlert} = companiesSlice.actions;
export default companiesSlice.reducer;