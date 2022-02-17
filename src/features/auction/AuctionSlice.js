import { createSlice } from '@reduxjs/toolkit';

const auctionList = [
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 2,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 3,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 4,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 5,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 6,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 7,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 8,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
];

const initialState = {
  auctionList: [],
};

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    setAuctionList(state, { payload }) {
      state.auctionList = payload;
    },
  },
});

export default auctionSlice;
