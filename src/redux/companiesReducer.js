import { createSlice } from '@reduxjs/toolkit'

function formatDate(data) {
    var tempDate = new Date(data);
    var formattedDate = [tempDate.getDate()+1, tempDate.getMonth()+1, tempDate.getFullYear()].join(` / `);
    return formattedDate
}

const initialState = {
    empresasArrayStorage:[]
}

const companiesSlice = createSlice({
    name: 'empresas',
    initialState: initialState,
    reducers: {
        newCompanyAction (state, action) {
            state.empresasArrayStorage = [...state.empresasArrayStorage, action.payload.empresaDadosStorage];
            console.log(state.empresasArrayStorage)
        },
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
        }
    }
})

export const {newCompanyAction, deleteCompanyAction, editCompanyAction} = companiesSlice.actions;
export default companiesSlice.reducer;