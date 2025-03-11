// services/todoApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../types/todo';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { page: number; limit: number; sortOrder: 'asc' | 'desc' }>({
      query: ({ page, limit, sortOrder }) => `/todos?_page=${page}&_limit=${limit}&_sort=id&_order=${sortOrder}`,
    }),
    getTodoById: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`, // Endpoint for fetching a single todo by ID
    }),
    searchTodos: builder.query<Todo[], string>({
      query: (title) => `/todos?title_like=${title}`, // Endpoint for searching todos by title
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useGetTodoByIdQuery, useSearchTodosQuery, useAddTodoMutation } = todoApi;