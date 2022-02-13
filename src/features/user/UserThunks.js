import {
  getOwnedPieceListApi,
  getUserInfoApi,
  linkWithKlipWalletApi,
  loginUserApi,
} from '../../lib/api/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import userSlice from './UserSlice';
import { getKlipAddressApi } from '../../nft/klipApi';
import {
  getBalanceOfKlay,
  getNftListOfAddressPromiseList,
} from '../../nft/caver';

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
      // await linkWithKlipWalletApi(klaytnAddress);
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
  async (payload, { dispatch }) => {
    const { address } = payload;
    const getNftTokenPromiseList: Promise[] =
      await getNftListOfAddressPromiseList(address);

    const pieceListFromChain = await Promise.all(getNftTokenPromiseList);

    const pieceListFromBackendResult = await getOwnedPieceListApi();
    const pieceListFromBackend = pieceListFromBackendResult.data;

    const pieceList = pieceListFromChain.map((pieceFromChain) => {
      const { tokenId, uri } = pieceFromChain;
      const matchPiece = pieceListFromBackend.filter(
        (pieceFromBackend) => pieceFromBackend.tokenId === tokenId,
      );
      if (matchPiece.length === 0) {
        return { tokenId: tokenId, uri: uri };
      } else {
        const piece = matchPiece[0];
        piece.uri = uri;
        return piece;
      }
    });

    dispatch(userSlice.actions.setOwnedPiece(pieceList));
  },
);
