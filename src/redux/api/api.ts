import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000'}),
  tagTypes: ['todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if(priority){
          params.append('priority', priority);
        }
        return {
          url: `/tasks`,
          method: 'GET',
          params: params
        };
      },
      providesTags: ['todo']
    }),

    addTodo: builder.mutation({
      query: (data) => {
        return {
          url: '/task',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['todo']
    }),

    updatedTodo: builder.mutation({
      query: (options) => {
        return {
          url: `/task/${options.id}`,
          method: 'PUT',
          body: options.data,
        };
      },
      invalidatesTags: ['todo']
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todo']
    }),
  }),
});

export const { useGetTodosQuery, useDeleteTodoMutation, useAddTodoMutation, useUpdatedTodoMutation } = baseApi;
