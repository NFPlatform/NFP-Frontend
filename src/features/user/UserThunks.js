import { getUserInfoApi, loginUserApi } from '../../lib/api/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import userSlice from './UserSlice';

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (payload) => {
    const { token, afterCallback } = payload;
    await loginUserApi(token);
    localStorage.setItem('nfptoken', token);
    afterCallback();
  },
);

export const getUserInfoThunk = createAsyncThunk(
  'user/getUserInfo',
  async (payload, { dispatch }) => {
    const result = await getUserInfoApi();
    dispatch(userSlice.actions.setUserInfo(result.data));
  },
);
