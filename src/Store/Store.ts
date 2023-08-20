import { configureStore } from '@reduxjs/toolkit';
import { postSlice } from './Slices/PostSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { commentsSlice } from './Slices/CommentsSlice';

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
