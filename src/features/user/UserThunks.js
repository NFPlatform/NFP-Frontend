import {
  getOwnedPieceListApi,
  getSellingPieceListApi,
  getUserInfoApi,
  loginUserApi,
} from '../../lib/api/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import userSlice from './UserSlice';
import { getKlipAddressApi } from '../../nft/klipApi';
import { getBalanceOfKlay, getNftListOfAddress } from '../../nft/caver';
import getKlipAddressFromStore from '../../lib/util/getKlipAddress';
import { MARKET_CONTRACT_ADDRESS } from '../../nft/constants/cypress';

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
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const userWallet = getKlipAddressFromStore(getState, rejectWithValue);
    if (userWallet === '') return;

    const pieceList = await getNftListOfAddress(
      userWallet,
      getOwnedPieceListApi,
    );

    await dispatch(userSlice.actions.setOwnedPiece(pieceList));
  },
);

export const getSellingPieceListThunk = createAsyncThunk(
  'user/getSellingPieceList',
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const userWallet = getKlipAddressFromStore(getState, rejectWithValue);
    if (userWallet === '') return;

    const pieceList = await getNftListOfAddress(
      MARKET_CONTRACT_ADDRESS,
      getSellingPieceListApi,
    );

    await dispatch(userSlice.actions.setSellingPiece(pieceList));
  },
);
