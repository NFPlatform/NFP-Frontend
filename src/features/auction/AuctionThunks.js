import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuctionListApi } from '../../lib/api/auction';
import auctionSlice from './AuctionSlice';

export const getAuctionListThunk = createAsyncThunk(
  'auction/getAuctionList',
  async (payload, { dispatch }) => {
    const { category, sort } = payload;
    const result = getAuctionListApi(category, sort);
    // dispatch(auctionSlice.actions.setAuctionList(result.data));
  },
);
