import { createAsyncThunk } from '@reduxjs/toolkit';
import { executeContractApi } from '../../nft/klipApi';
import {
  MARKET_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from '../../nft/constants/cypress';
import { registerPieceApi, setToSellingApi } from '../../lib/api/piece';
import getKlipAddressFromStore from '../../lib/util/getKlipAddress';
import { PRODUCTION_BACKEND_URL, TEST_IMG_URL } from '../../lib/constant';
import {
  MINT_WITH_TOKEN_URI_ABI,
  SAFE_TRANSFER_FROM_ABI,
} from '../../nft/constants/abi';

export const registerPieceThunk = createAsyncThunk(
  'piece/registerPiece',
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const userWallet = getKlipAddressFromStore(getState, rejectWithValue);
    if (userWallet === '') return;

    const {
      data,
      actionWithRedirectUrl,
      modalCloseAction,
      afterResultCallback,
    } = payload;

    const response = await registerPieceApi(data);
    const contractPieceId =
      response.data.pieceId +
      (process.env.REACT_APP_ENV === 'production' ? 10000 : 1000);

    const resultImgUrl =
      process.env.REACT_APP_ENC === 'production'
        ? `${PRODUCTION_BACKEND_URL}/piece/${contractPieceId}/img`
        : TEST_IMG_URL;

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      MINT_WITH_TOKEN_URI_ABI,
      '0',
      [userWallet, contractPieceId, resultImgUrl],
      actionWithRedirectUrl,
      modalCloseAction,
      afterResultCallback,
    );
  },
);

export const sellingPieceThunk = createAsyncThunk(
  'piece/sellingPiece',
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const userWallet = getKlipAddressFromStore(getState, rejectWithValue);
    if (userWallet === '') return;

    const {
      data,
      actionWithRedirectUrl,
      modalCloseAction,
      afterResultCallback,
    } = payload;

    const response = await setToSellingApi(data);

    const contractPieceId =
      data.pieceId +
      (process.env.REACT_APP_ENV === 'production' ? 10000 : 1000);

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      SAFE_TRANSFER_FROM_ABI,
      '0',
      [userWallet, MARKET_CONTRACT_ADDRESS, contractPieceId],
      actionWithRedirectUrl,
      modalCloseAction,
      afterResultCallback,
    );
  },
);
