import { configureStore } from "@reduxjs/toolkit";
import { empresasReducer } from "./empresasReducer";

export const store = configureStore({reducer: empresasReducer})
