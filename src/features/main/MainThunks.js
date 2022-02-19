import { createAsyncThunk } from '@reduxjs/toolkit';
import { getHotArtistApi, getTopCollectorListApi } from '../../lib/api/main';
import mainSlice from './MainSlice';

export const getTopCollectorListThunk = createAsyncThunk(
  'main/topCollectorList',
  async (_, { dispatch }) => {
    const result = await getTopCollectorListApi();
    dispatch(mainSlice.actions.setTopCollectorList(result.data));
  },
);

export const getHotArtistThunk = createAsyncThunk(
  'main/getHotArtist',
  async (payload, { dispatch }) => {
    const result = await getHotArtistApi();
    dispatch(mainSlice.actions.setHotArtist(result.data));
  },
);
