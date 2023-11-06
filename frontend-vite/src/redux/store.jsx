import { configureStore } from "@reduxjs/toolkit";

// ******** import api calls **********
import { AuthenticationAPI } from "./API/AuthApi";
import { OrderAPI } from "./API/orderAPI";
import { NotificationAPI } from "./API/NotificationAPI";

// store application
const Store = configureStore({
    reducer: {
        [AuthenticationAPI.reducerPath]: AuthenticationAPI.reducer,
        [OrderAPI.reducerPath]: OrderAPI.reducer,
        [NotificationAPI.reducerPath]: NotificationAPI.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({

        }).concat([
            // wirte your middlewares here
            AuthenticationAPI.middleware,
            OrderAPI.middleware,
            NotificationAPI.middleware,
        ])

})


export default Store;