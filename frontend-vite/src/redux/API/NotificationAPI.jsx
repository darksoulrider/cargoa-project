import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"





// ! make lazy hooke for some api endpoints
export const NotificationAPI = createApi({
    reducerPath: "Notification",
    baseQuery: fetchBaseQuery({
        // check url variable fetch
        baseUrl: "http://localhost:9003/api/v3",
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
        SendInvite: builder.mutation({
            query: (data) => ({
                url: `/vendor/invite`,
                method: "POST",
                body: data,

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

    })
})


export const {
    useSendInviteMutation,
} = NotificationAPI;