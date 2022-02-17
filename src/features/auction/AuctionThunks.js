import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuctionListApi } from '../../lib/api/auction';
import auctionSlice from './AuctionSlice';
import { executeContractApi } from '../../nft/klipApi';
import {
  MARKET_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from '../../nft/constants/cypress';
import { getNftListOfAddress } from '../../nft/caver';
import getKlipAddressFromStore from '../../lib/util/getKlipAddress';

export const getAuctionListThunk = createAsyncThunk(
  'auction/getAuctionList',
  async (payload, { dispatch }) => {
    const { category, sort } = payload;

    const pieceList = await getNftListOfAddress(
      MARKET_CONTRACT_ADDRESS,
      getAuctionListApi,
    );

    await dispatch(auctionSlice.actions.setAuctionList(pieceList));
  },
);

export const buyPieceThunk = createAsyncThunk(
  'auction/buyPiece',
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const userWallet = getKlipAddressFromStore(getState, rejectWithValue);
    if (userWallet === '') return;

    const { nftTokenId, actionWithRedirectUrl } = payload;

    const abi =
      '{ "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "NFTAddress", "type": "address" } ], "name": "buyNFT", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }';

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      abi,
      10000000000000000,
      [nftTokenId, NFT_CONTRACT_ADDRESS],
      actionWithRedirectUrl,
    );
  },
);
