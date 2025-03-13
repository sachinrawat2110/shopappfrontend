import { configureStore } from "@reduxjs/toolkit";
import authslice from './slices/authslice';
const store = configureStore({
    reducer:
    {
        auth:authslice
    }
})
export default store;