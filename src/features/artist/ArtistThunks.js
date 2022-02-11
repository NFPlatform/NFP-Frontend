import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerArtistApi } from '../../lib/api/artist';
import { getUserInfoThunk } from '../user/UserThunks';
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
