import { createAsyncThunk } from '@reduxjs/toolkit';
import { executeContractApi } from '../../nft/klipApi';
import {
  MARKET_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from '../../nft/constants/cypress';
import { registerPieceApi, setToSellingApi } from '../../lib/api/piece';
import getKlipAddressFromStore from '../../lib/util/getKlipAddress';

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
    const imgUrl = `http://localhost:6040/piece/${uniqueTokenId}/img`;
    const url =
      'https://media.vlpt.us/images/gil0127/post/857b454c-74a1-4fbc-b00f-3d0aff6f1a55/111111111.png';

    const abi =
      '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      abi,
      '0',
      [userWallet, uniqueTokenId, url],
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

    const abi =
      '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      abi,
      '0',
      [userWallet, MARKET_CONTRACT_ADDRESS, data.pieceId + 1000],
      actionWithRedirectUrl,
      modalCloseAction,
      afterResultCallback,
    );
  },
);

// 쓰지 않는 Thunk
export const mintCardWithURIThunk = createAsyncThunk(
  'piece/mintCardWithURI',
  async (payload, { dispatch }) => {
    const { userWallet, uniqueTokenId, imgUrl, actionWithRedirectUrl } =
      payload;
    const abi =
      '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      abi,
      0,
      [userWallet, uniqueTokenId, imgUrl],
      actionWithRedirectUrl,
    );
  },
);
