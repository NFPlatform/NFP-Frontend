import { createAsyncThunk } from '@reduxjs/toolkit/src/createAsyncThunk';
import { getUserInfoApi, loginUserApi } from '../../lib/api/user';

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (payload, { dispatch }) => {
    const { token } = payload;
    await loginUserApi(token);
    localStorage.setItem('nfptoken', token);
  },
);

export const getUserInfoThunk = createAsyncThunk(
  'user/getUserInfo',
  async (payload, { dispatch }) => {
    const result = await getUserInfoApi();
  },
);
