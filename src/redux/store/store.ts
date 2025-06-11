import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/redux/slice/authSlice';
import { searchBlogsReducer } from '@/redux/slice/searchBlogsSlice';
import { blogDetailsReducer } from '../slice/blogDetailsSlice';
import { userReducer } from '../slice/userSlice';
import { blogEditReducer } from '../slice/editBlogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    searchBlogs: searchBlogsReducer,
    blogDetails: blogDetailsReducer,
    blogEdit: blogEditReducer,
  },
});

//Types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
