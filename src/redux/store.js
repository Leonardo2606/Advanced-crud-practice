import { configureStore } from "@reduxjs/toolkit";
import empresasReducer from "./empresasReducer";

const store = configureStore({
    reducer: {
        empresas: empresasReducer
    }
})

export default store;