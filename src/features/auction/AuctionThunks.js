import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuctionListApi } from '../../lib/api/auction';
import auctionSlice from './AuctionSlice';
import { executeContractApi } from '../../nft/klipApi';
import {
  MARKET_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from '../../nft/constants/cypress';
import { getNftListOfAddress } from '../../nft/caver';
import { toast } from 'react-toastify';

export const getAuctionListThunk = createAsyncThunk(
  'auction/getAuctionList',
  async (payload, { dispatch }) => {
    const { category, sort } = payload;

    const pieceList = await getNftListOfAddress(
      MARKET_CONTRACT_ADDRESS,
      getAuctionListApi,
    );
    dispatch(auctionSlice.actions.setAuctionList(pieceList));
  },
);

export const sendToAuctionThunk = createAsyncThunk(
  'auction/sendToAuction',
  async (payload, { state, dispatch, rejectWithValue }) => {
    const userWallet = state.user.klipAddressHex;
    if (userWallet === '') {
      toast.error('지갑 연동이 필요합니다.');
      rejectWithValue('지갑 연동이 필요합니다.');
      return;
    }

    const { nftTokenId, actionWithRedirectUrl } = payload;

    const abi =
      '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';

    await executeContractApi(
      NFT_CONTRACT_ADDRESS,
      abi,
      0,
      [userWallet, MARKET_CONTRACT_ADDRESS, nftTokenId],
      actionWithRedirectUrl,
    );
  },
);

export const buyPieceThunk = createAsyncThunk(
  'auction/buyPiece',
  async (payload, { state, dispatch, rejectWithValue }) => {
    const userWallet = state.user.klipAddressHex;
    if (userWallet === '') {
      toast.error('지갑 연동이 필요합니다.');
      rejectWithValue('지갑 연동이 필요합니다.');
      return;
    }

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
