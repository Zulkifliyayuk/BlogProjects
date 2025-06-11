import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type userState = {
  email: string;
};

const initialState: userState = {
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmailUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setEmailUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
