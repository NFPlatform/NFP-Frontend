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
    const uniqueTokenId = response.data.pieceId + 1000;

    const resultImgUrl =
      process.env.REACT_APP_ENC === 'production'
        ? `${PRODUCTION_BACKEND_URL}/piece/${uniqueTokenId}/img`
        : TEST_IMG_URL;

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      MINT_WITH_TOKEN_URI_ABI,
      '0',
      [userWallet, uniqueTokenId, resultImgUrl],
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

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      SAFE_TRANSFER_FROM_ABI,
      '0',
      [userWallet, MARKET_CONTRACT_ADDRESS, data.pieceId + 1000],
      actionWithRedirectUrl,
      modalCloseAction,
      afterResultCallback,
    );
  },
);
