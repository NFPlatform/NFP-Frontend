import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({});

export const store = configureStore({
  reducer,
});
