import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: -1,
  thumbnailImg: '',
  name: '',
  isArtist: false,
  klipAddressHex: '',
  balanceOfKlay: 0,
  ownedPieceList: [],
  sellingPieceList: [],
  topArtist: {
    id: -1,
    name: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.id = payload.id;
      state.thumbnailImg = `/user/${payload.id}/img`;
      state.name = payload.name;
      state.isArtist = payload.artist;
    },
    setArtist(state) {
      state.isArtist = true;
    },
    setKlipAddressHex(state, { payload }) {
      state.klipAddressHex = payload;
    },
    setBalanceOfKlay(state, { payload }) {
      state.balanceOfKlay = payload;
    },
    setTopArtist(state, { payload }) {
      state.topArtist.id = payload.id;
      state.topArtist.name = payload.name;
    },
    setOwnedPiece(state, { payload }) {
      state.ownedPieceList = payload;
    },
    setSellingPiece(state, { payload }) {
      state.sellingPieceList = payload;
    },
  },
});

export default userSlice;
