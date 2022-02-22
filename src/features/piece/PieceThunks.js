import { createAsyncThunk } from '@reduxjs/toolkit';
import { executeContractApi } from '../../nft/klipApi';
import {
  MARKET_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from '../../nft/constants/cypress';
import {
  registerPieceApi,
  setToSellingApi,
  validateSetToSellingApi,
} from '../../lib/api/piece';
import getKlipAddressFromStore from '../../lib/util/getKlipAddress';
import { PRODUCTION_BACKEND_URL, TEST_IMG_URL } from '../../lib/constant';
import {
  MINT_WITH_TOKEN_URI_ABI,
  SAFE_TRANSFER_FROM_ABI,
} from '../../nft/constants/abi';
import { TOKEN_OFFSET } from '../../nft/constants/offset';
import { validateBuyPieceApi } from '../../lib/api/auction';

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
    const pieceId = response.data.pieceId;
    const contractPieceId = pieceId + TOKEN_OFFSET;

    const resultImgUrl = `${PRODUCTION_BACKEND_URL}/piece/${pieceId}/img`;

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      MINT_WITH_TOKEN_URI_ABI,
      '0',
      [userWallet, contractPieceId, resultImgUrl],
      async (redirectUrl, prepareResponse) => {
        await actionWithRedirectUrl(redirectUrl);
      },
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

    const contractPieceId = data.pieceId + TOKEN_OFFSET;

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      SAFE_TRANSFER_FROM_ABI,
      '0',
      [userWallet, MARKET_CONTRACT_ADDRESS, contractPieceId],
      async (redirectUrl, prepareResponse) => {
        const result = await validateSetToSellingApi(data, {
          requestKey: prepareResponse.request_key,
          timestamp: prepareResponse.expiration_time,
        });
        await actionWithRedirectUrl(redirectUrl);
      },
      modalCloseAction,
      async (klipResult, requestKey) => {
        const result = await setToSellingApi(data, requestKey);
        await afterResultCallback();
      },
    );
  },
);
