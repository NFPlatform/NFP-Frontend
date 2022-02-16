import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/UserSlice';
import auctionSlice from '../features/auction/AuctionSlice';
import mainSlice from '../features/main/MainSlice';

const reducer = combineReducers({
  main: mainSlice.reducer,
  user: userSlice.reducer,
  auction: auctionSlice.reducer,
});

export const store = configureStore({
  reducer,
});
