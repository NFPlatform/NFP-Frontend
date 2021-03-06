import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auctionList: [],
  sortedAuctionList: [],
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
    userVote: false,
  },
};

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    setAuctionList(state, { payload }) {
      state.auctionList = payload;
    },
    setSortedAuctionList(state, { payload }) {
      state.sortedAuctionList = payload;
    },
    setAuctionDetail(state, { payload }) {
      state.auctionDetail = payload;
    },
    voteToPiece(state) {
      state.auctionDetail.piece.vote += 1;
      state.auctionDetail.userVote = true;
    },
    deVoteToPiece(state) {
      state.auctionDetail.piece.vote -= 1;
      state.auctionDetail.userVote = false;
    },
  },
});

export default auctionSlice;
