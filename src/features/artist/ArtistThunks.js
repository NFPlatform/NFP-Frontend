import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTopArtistApi, registerArtistApi } from '../../lib/api/artist';
import userSlice from '../user/UserSlice';

export const registerArtistThunk = createAsyncThunk(
  'artist/registerArtist',
  async (payload, { dispatch }) => {
    const { data, afterCallback } = payload;
    await registerArtistApi(data);
    await dispatch(userSlice.actions.setArtist());
    afterCallback();
  },
);

export const getTopArtistThunk = createAsyncThunk(
  'artist/getTopArtist',
  async (payload, { dispatch }) => {
    const result = await getTopArtistApi();
    dispatch(userSlice.actions.setTopArtist(result.data));
  },
);
