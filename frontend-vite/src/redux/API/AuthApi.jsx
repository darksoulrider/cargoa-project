import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const token = localStorage.getItem('token')


// ! make lazy hooke for some api endpoints
export const AuthenticationAPI = createApi({
    reducerPath: "Auth",

    baseQuery: fetchBaseQuery({
        // check url variable fetch
        baseUrl: "http://localhost:9001/api/v1",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `token ${token}`)
            }
            return headers;
        },
        // if mobile is in local environement then use the chang base url with ip

    }),
    tagTypes: ['AUTH'], // to refetch the api
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: "POST",
                body: data,

            })
        }),
        signup_user: builder.mutation({
            query: (data) => ({
                url: `/signup-user`,
                method: "POST",
                body: data,

            })
        }),
        signup_vendor: builder.mutation({
            query: (data) => ({
                url: `/signup-vendor`,
                method: "POST",
                body: data,

            })
        }),
        logout: builder.query({
            query: () => ({
                url: '/logout',
                method: 'GET',

            })
        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET',
            })
        }),
        getAllUser: builder.query({
            query: () => ({
                url: `/user/getAlluser`,
                method: 'GET',
            })
        }),
        getSingleVendor: builder.query({
            query: (id) => ({
                url: `/vendor/${id}`,
                method: 'GET',
            })
        }),
        getAllVendor: builder.query({
            query: () => ({
                url: `/vendor/getAllvendor`,
                method: 'GET',
            })
        }),
    })
})


export const {
    useLoginMutation,
    useSignup_userMutation,
    useSignup_vendorMutation,
    useLogoutQuery,
    useGetAllVendorQuery
} = AuthenticationAPI;