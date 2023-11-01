import { configureStore } from "@reduxjs/toolkit";

// ******** import api calls **********
import { AuthenticationAPI } from "./API/AuthApi";


const Store = configureStore({
    reducer: {
        [AuthenticationAPI.reducerPath]: AuthenticationAPI.reducer,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({

        }).concat([
            // wirte your middlewares here
            AuthenticationAPI.middleware,
        ])

})


export default Store;