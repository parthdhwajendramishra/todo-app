// services/todoApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddTodoData, Todo, TodoFormData } from '../types/todo';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { page: number; limit: number; sortOrder: 'asc' | 'desc' }>({
      query: ({ page, limit, sortOrder }) => `/todos?_page=${page}&_limit=${limit}&_sort=id&_order=${sortOrder}`,
    }),
    getTodoById: builder.query<TodoFormData, number>({
      query: (id) => `/todos/${id}`, // Endpoint for fetching a single todo by ID
    }),
    searchTodos: builder.query<Todo[], string>({
      query: (title) => `/todos?title_like=${title}`, // Endpoint for searching todos by title
    }),
    addTodo: builder.mutation<AddTodoData, Partial<AddTodoData>>({
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
    }),
    updateTodo: builder.mutation<TodoFormData, Partial<TodoFormData> & Pick<TodoFormData, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useGetTodoByIdQuery, useSearchTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = todoApi;