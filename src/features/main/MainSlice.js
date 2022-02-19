import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topCollectorList: [],
  hotArtist: {},
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTopCollectorList(state, { payload }) {
      state.topCollectorList = payload;
    },
    setHotArtist(state, { payload }) {
      state.hotArtist = payload;
    },
  },
});

export default mainSlice;
