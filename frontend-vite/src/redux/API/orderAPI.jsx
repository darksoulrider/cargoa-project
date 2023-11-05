import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"



export const OrderAPI = createApi({
    reducerPath: "Order",

    baseQuery: fetchBaseQuery({
        // check url variable fetch
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `token ${token}`)
            }
            headers.set('Access-Control-Allow-Origin', '*')
            return headers;
        },
        baseUrl: "http://localhost:9002/api",

    }),
    tagTypes: ['order', 'vendorOrder'], // to refetch the api
    endpoints: (builder) => ({
        // ************ All user query is below ***********
        createOrder: builder.mutation({
            query: (data) => ({
                url: `/user/create-order`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['order']
            // use tags here to make invalidate tags
        }),
        confirmOrderDate: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/order/confirm/${id}`,
                method: "POST",
                body: data,
                // ! will come laer once vendor gives 3 shcedule
                // !  query: ({ id, ...data }) => ({
            }),
            invalidatesTags: ['order']
        }),
        getAllUserOrder: builder.query({
            query: () => ({
                url: `/user/order/all`,
                method: "GET",
            }),
            tagTypes: ['order']
        }),
        getUserSingleOrder: builder.query({
            query: (id) => ({
                url: `/user/order/${id}`,
                method: "GET",
            }),
            tagTypes: ['order']
        }),

        // ************ All vendor query below ************888
        getAllVendorOrder: builder.query({
            query: () => ({
                url: `/vendor/order/all`,
                method: "GET",
            }),
            tagTypes: ['vendorOrder']
        }),
        ScheduleOrder: builder.mutation({
            query: ({ id, data }) => ({
                url: `/vendor/order/offerschedule/${id}`,
                body: data,
                method: 'POST'
            }),
            invalidatesTags: ['vendorOrder']
        }),
        getSingelVendorOrder: builder.query({
            query: (id) => ({
                url: `/vendor/order/${id}`,
                method: "GET",
            }),
            tagTypes: ['vendorOrder']
        }),

    })
})


export const {
    useCreateOrderMutation,
    useConfirmOrderDateMutation,
    useGetAllUserOrderQuery,
    useGetUserSingleOrderQuery,
    useGetAllVendorOrderQuery,
    useScheduleOrderMutation,
    useGetSingelVendorOrderQuery
} = OrderAPI;