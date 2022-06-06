import { createSlice } from '@reduxjs/toolkit'

/*export const novaEmpresaAction = createAction('novaEmpresaAction');
export const deletarEmpresaAction = createAction('deletarEmpresaAction');*/

/*export const empresasReducer = createReducer(
    initialState,
    (builder) => {
    builder
    .addCase(novaEmpresaAction, (state, action) => {
        state.empresasArrayStorage = [...state.empresasArrayStorage, action.payload.empresaDadosStorage];
        state.empresasArrayView = [...state.empresasArrayView, action.payload.empresaDadosView];
    })
    .addCase(deletarEmpresaAction, (state, action) => {
        state.empresasArrayView = state.empresasArrayView.filter((empresa, idx) => idx !== action.payload);
    })
});*/

function formatDate(data) {
    var tempDate = new Date(data);
    var formattedDate = [tempDate.getDate()+1, tempDate.getMonth()+1, tempDate.getFullYear()].join(' '+'/'+' ');
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
            empresaStorageToBeEdited.cep = action.payload.valores.cep
            empresaStorageToBeEdited.data = formatDate(action.payload.valores.data)
            empresaStorageToBeEdited.cnpj = action.payload.valores.cnpj
            empresaStorageToBeEdited.document = action.payload.valores.document
            empresaStorageToBeEdited.address = action.payload.valores.address
            empresaStorageToBeEdited.number = action.payload.valores.number
            empresaStorageToBeEdited.complement = action.payload.valores.complement
            empresaStorageToBeEdited.neighborhood = action.payload.valores.neighborhood
            empresaStorageToBeEdited.ufSelected = action.payload.valores.ufSelected
            empresaStorageToBeEdited.city = action.payload.valores.city
            
            state.empresasArrayStorage.splice(action.payload.index, 1, empresaStorageToBeEdited);
        }
    }
})

export const {newCompanyAction, deleteCompanyAction, editCompanyAction} = companiesSlice.actions;
export default companiesSlice.reducer;