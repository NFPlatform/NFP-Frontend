import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTopCollectorListApi } from '../../lib/api/main';
import mainSlice from './MainSlice';

export const getTopCollectorListThunk = createAsyncThunk(
  'main/topCollectorList',
  async (_, { dispatch }) => {
    const result = getTopCollectorListApi();
    // dispatch(mainSlice.actions.setTopCollectorList(result.data));
  },
);
