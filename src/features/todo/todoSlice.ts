// features/todo/todoSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../types/todo';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${1}&_limit=${20}`);
  return res.json();
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default todoSlice.reducer;