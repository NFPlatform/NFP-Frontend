import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/UserSlice';
import auctionSlice from '../features/auction/AuctionSlice';

const reducer = combineReducers({
  user: userSlice.reducer,
  auction: auctionSlice.reducer,
});

export const store = configureStore({
  reducer,
});
