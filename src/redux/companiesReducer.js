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

const initialState = {
    empresasArrayStorage:[],
    empresasArrayView:[]
}

const companiesSlice = createSlice({
    name: 'empresas',
    initialState: initialState,
    reducers: {
        newCompanyAction (state, action) {
            state.empresasArrayStorage = [...state.empresasArrayStorage, action.payload.empresaDadosStorage];
            state.empresasArrayView = [...state.empresasArrayView, action.payload.empresaDadosView];
        },
        deleteCompanyAction (state, action) {
            state.empresasArrayView = state.empresasArrayView.filter((empresa, idx) => idx !== action.payload);
            state.empresasArrayStorage = state.empresasArrayStorage.filter((empresa, idx) => idx !== action.payload);
        },
        editCompanyAction (state, action) {
            console.log('disparou editar action')
            const empresaViewToBeEdited = state.empresasArrayView[action.payload.index];
            const empresaStorageToBeEdited = state.empresasArrayStorage[action.payload.index];
            if( action.payload.valores.name === empresaViewToBeEdited.name &&
                action.payload.valores.cep === empresaViewToBeEdited.cep &&
                action.payload.valores.uf === empresaViewToBeEdited.ufSelected &&
                action.payload.valores.data === empresaViewToBeEdited.data) {console.log('nada mudou'); return}
            else {
                
                empresaViewToBeEdited.name = action.payload.valores.name;
                empresaStorageToBeEdited.name = action.payload.valores.name;
            
                empresaViewToBeEdited.cep = action.payload.valores.cep;
                empresaStorageToBeEdited.cep = action.payload.valores.cep;

                empresaViewToBeEdited.ufSelected = action.payload.valores.uf;
                empresaStorageToBeEdited.ufSelected = action.payload.valores.uf;

                empresaViewToBeEdited.data = action.payload.valores.data;
                empresaStorageToBeEdited.data = action.payload.valores.data;
                
                state.empresasArrayView.splice(action.payload.index, 1, empresaViewToBeEdited);
                state.empresasArrayStorage.splice(action.payload.index, 1, empresaStorageToBeEdited);
                console.log('algum dado mudou');
            }
        }
    }
})

export const {newCompanyAction, deleteCompanyAction, editCompanyAction} = companiesSlice.actions;
export default companiesSlice.reducer;