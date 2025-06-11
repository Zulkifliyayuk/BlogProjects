import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type SearchBlogsState = {
  query: string;
  limit: number;
  page: number;
};

const initialState: SearchBlogsState = {
  query: '',
  limit: 10,
  page: 1,
};

const searchBlogsSlice = createSlice({
  name: 'searchBlogs',
  initialState,
  reducers: {
    setQuerySearch: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setLimitSearch: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setPageSearch: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setQuerySearch, setLimitSearch, setPageSearch } =
  searchBlogsSlice.actions;
export const searchBlogsReducer = searchBlogsSlice.reducer;
