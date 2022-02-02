import { createAction, createReducer } from '@reduxjs/toolkit'

export const novaEmpresaAction = createAction('novaEmpresa');

export const empresasReducer = createReducer(
    {
        empresasArrayStorage:[],
        empresasArrayView:[]
    }, 
    (builder) => {
    builder
    .addCase(novaEmpresaAction, (state, action) => {
        state.empresasArrayStorage = [...state.empresasArrayStorage, action.payload.empresaDadosStorage];
        state.empresasArrayView = [...state.empresasArrayView, action.payload.empresaDadosView];
    })
});