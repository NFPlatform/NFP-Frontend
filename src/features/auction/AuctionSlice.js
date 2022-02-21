import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auctionList: [],
  auctionDetail: {
    id: -1,
    pieceId: -1,
    piece: {
      id: 0,
      name: '',
      artist: {
        id: 0,
        name: '',
      },
      vote: 0,
      title: '',
      bio: '',
      subLink: '',
    },
    seller: {
      id: 0,
      name: '',
    },
    klay: 0,
    nfpToken: 0,
    isVote: false,
  },
};

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    setAuctionList(state, { payload }) {
      state.auctionList = payload;
    },
    setAuctionDetail(state, { payload }) {
      state.auctionDetail = payload;
    },
    voteToPiece(state) {
      state.auctionDetail.piece.vote += 1;
    },
    deVoteToPiece(state) {
      state.auctionDetail.piece.vote -= 1;
    },
  },
});

export default auctionSlice;
