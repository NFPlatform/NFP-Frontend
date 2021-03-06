import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  buyPieceApi,
  getAuctionDetailApi,
  getAuctionListApi,
  validateBuyPieceApi,
} from '../../lib/api/auction';
import auctionSlice from './AuctionSlice';
import { executeContractApi } from '../../nft/klipApi';
import {
  MARKET_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from '../../nft/constants/cypress';
import { getNftListOfAddress } from '../../nft/caver';
import getKlipAddressFromStore from '../../lib/util/getKlipAddress';
import { BUY_NFT_ABI } from '../../nft/constants/abi';
import { TOKEN_OFFSET } from '../../nft/constants/offset';

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

export const getSortedAuctionListThunk = createAsyncThunk(
  'auction/getSortedAuctionList',
  async (payload, { dispatch }) => {
    let pieceList = await getNftListOfAddress(
      MARKET_CONTRACT_ADDRESS,
      getAuctionListApi,
    );

    pieceList.sort((a, b) => {
      return b.piece.vote - a.piece.vote;
    });

    await dispatch(auctionSlice.actions.setSortedAuctionList(pieceList));
  },
);

export const getAuctionDetailThunk = createAsyncThunk(
  'auction/getDetail',
  async (payload, { dispatch }) => {
    const { auctionId } = payload;

    const result = await getAuctionDetailApi(auctionId);
    await dispatch(auctionSlice.actions.setAuctionDetail(result.data));
  },
);

export const buyPieceThunk = createAsyncThunk(
  'auction/buyPiece',
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const userWallet = getKlipAddressFromStore(getState, rejectWithValue);
    if (userWallet === '') return;

    const {
      auctionId,
      pieceId,
      actionWithRedirectUrl,
      modalCloseAction,
      afterResultCallback,
    } = payload;

    const contractPieceId = pieceId + TOKEN_OFFSET;

    await executeContractApi(
      MARKET_CONTRACT_ADDRESS,
      BUY_NFT_ABI,
      '10000000000000000',
      [contractPieceId, NFT_CONTRACT_ADDRESS],
      async (redirectUrl, prepareResponse) => {
        const result = await validateBuyPieceApi(auctionId, {
          requestKey: prepareResponse.request_key,
          timestamp: prepareResponse.expiration_time,
        });
        await actionWithRedirectUrl(redirectUrl);
      },
      modalCloseAction,
      async (klipResult, requestKey) => {
        const result = await buyPieceApi(auctionId, requestKey);
        await afterResultCallback();
      },
    );
  },
);
