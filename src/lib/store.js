import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/UserSlice';

const reducer = combineReducers({
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer,
});
