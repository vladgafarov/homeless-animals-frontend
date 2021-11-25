import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const backendApi = createApi({
   reducerPath: 'backendApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://localhost:5001/',
   }),
   tagTypes: ['Group', 'User', 'Post'],
   endpoints: build => ({
      autorize: build.query<{ text: string }, void>({
         query: () => 'authorize',
      }),
   }),
})
