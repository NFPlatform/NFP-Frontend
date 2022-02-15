import {
  getOwnedPieceListApi,
  getUserInfoApi,
  loginUserApi,
} from '../../lib/api/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import userSlice from './UserSlice';
import { getKlipAddressApi } from '../../nft/klipApi';
import { getBalanceOfKlay, getNftListOfAddress } from '../../nft/caver';
import { toast } from 'react-toastify';

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

export const linkWithKlipWalletThunk = createAsyncThunk(
  'user/linkWithKlip',
  async (payload, { dispatch }) => {
    const { actionWithRedirectUrl, afterResultCallback } = payload;

    await getKlipAddressApi(actionWithRedirectUrl, async (result) => {
      const klaytnAddress = result.data.result.klaytn_address;

      localStorage.setItem('klaytnAddress', klaytnAddress);
      dispatch(userSlice.actions.setKlipAddressHex(klaytnAddress));
      await afterResultCallback();
    });
  },
);

export const setKlipWalletThunk = createAsyncThunk(
  'user/setKlipWallet',
  async (payload, { dispatch }) => {
    const { klaytnAddress } = payload;

    const balanceOfKlay = await getBalanceOfKlay(klaytnAddress);

    dispatch(userSlice.actions.setKlipAddressHex(klaytnAddress));
    dispatch(userSlice.actions.setBalanceOfKlay(balanceOfKlay));
  },
);

export const getBalanceOfKlayThunk = createAsyncThunk(
  'user/getBalanceOfKlay',
  async (payload, { dispatch }) => {
    const { address } = payload;
    const balanceOfKlay = await getBalanceOfKlay(address);
    dispatch(userSlice.actions.setBalanceOfKlay(balanceOfKlay));
  },
);

export const getOwnedPieceListThunk = createAsyncThunk(
  'user/getOwnedPieceList',
  async (payload, { state, dispatch, rejectWithValue }) => {
    const userWallet = state.user.klipAddressHex;
    if (userWallet === '') {
      toast.error('지갑 연동이 필요합니다.');
      rejectWithValue('지갑 연동이 필요합니다.');
      return;
    }

    const pieceList = await getNftListOfAddress(
      userWallet,
      getOwnedPieceListApi,
    );

    dispatch(userSlice.actions.setOwnedPiece(pieceList));
  },
);
