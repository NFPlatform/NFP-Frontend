import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: -1,
  thumbnailImg: '',
  name: '',
  isArtist: false,
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
  },
});

export default userSlice;
