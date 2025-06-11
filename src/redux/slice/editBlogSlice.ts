import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type BlogEditState = {
  id: number;
};

const initialState: BlogEditState = {
  id: 0,
};

const blogEditSlice = createSlice({
  name: 'blogEdit',
  initialState,
  reducers: {
    setIdBlogEdit: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { setIdBlogEdit } = blogEditSlice.actions;
export const blogEditReducer = blogEditSlice.reducer;
