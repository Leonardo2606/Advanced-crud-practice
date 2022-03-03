import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./companiesReducer";

const store = configureStore({
    reducer: {
        companies: companiesReducer
    }
})

export default store;