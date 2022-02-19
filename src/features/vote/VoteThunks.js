import { createAsyncThunk } from '@reduxjs/toolkit';
import { deVoteToPieceApi, voteToPieceApi } from '../../lib/api/vote';
import auctionSlice from '../auction/AuctionSlice';

export const voteToPieceThunk = createAsyncThunk(
  'vote/voteToPiece',
  async (payload, { dispatch }) => {
    const { pieceId } = payload;
    const result = await voteToPieceApi(pieceId);
    dispatch(auctionSlice.actions.voteToPiece());
  },
);

export const deVoteToPieceThunk = createAsyncThunk(
  'vote/deVoteToPiece',
  async (payload, { dispatch }) => {
    const { pieceId } = payload;
    const result = await deVoteToPieceApi(pieceId);
    dispatch(auctionSlice.actions.deVoteToPiece());
  },
);
