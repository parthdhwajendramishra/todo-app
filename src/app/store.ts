// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
import { todoApi } from '../services/todoApi';

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    todos: todoReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware), // Add the API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;