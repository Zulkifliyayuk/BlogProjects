import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type BlogDetailState = {
  id: number;
};

const initialState: BlogDetailState = {
  id: 0,
};

const blogDetailsSlice = createSlice({
  name: 'blogDetail',
  initialState,
  reducers: {
    setIdBlog: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { setIdBlog } = blogDetailsSlice.actions;
export const blogDetailsReducer = blogDetailsSlice.reducer;
