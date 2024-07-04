import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://todo-list-redux-server.onrender.com' }),
  tagTypes: ['todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: '/tasks',
        method: 'GET',
      }),
      providesTags: ['todo']
    }),

    addTodo: builder.mutation({
        query: (data) => {
            console.log(data, "data is add")
       return  { url: '/task',
          method: 'POST',
          body:data,}
        },
        invalidatesTags:['todo']
      }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:['todo']
    }),
  }),
});

export const { useGetTodosQuery, useDeleteTodoMutation , useAddTodoMutation } = baseApi;
