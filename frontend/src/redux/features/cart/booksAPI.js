import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({ 
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (headers, api) => {
        const token = localStorage.getItem('token')
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => '/',
            providesTags: ['Books'],
            transformResponse: (response) => {
                console.log('API Response:', response);
                return response.books || [];
            },
        }),
    }),
})

export const { useFetchAllBooksQuery } = booksApi