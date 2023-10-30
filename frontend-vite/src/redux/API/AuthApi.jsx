import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"



export const AuthenticationAPI = createApi({
    reducerPath: "Auth",

    baseQuery: fetchBaseQuery({
        // check url variable fetch
        baseUrl: "http://localhost:9001/api",
        // credentials: "include"
    }),
    tagTypes: ['AUTH'], // to refetch the api
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: "POST",
                body: data
            })
        }),
        signup_user: builder.mutation({
            query: (data) => ({
                url: `/signup-user`,
                method: "POST",
                body: data
            })
        }),
        signup_vendor: builder.mutation({
            query: (data) => ({
                url: `/signup-vendor`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.query({
            query: () => ({
                url: '/logout',
                method: 'GET'
            })
        })
    })
})


export const {
    useLoginMutation,
    useSignup_userMutation,
    useSignup_vendorMutation,
    useLogoutQuery,
} = AuthenticationAPI;