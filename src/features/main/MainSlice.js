import { createSlice } from '@reduxjs/toolkit';

const topCollectorList = [
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: 'j.g',
    klay: 120,
    thumbnailImg: '',
  },
];

const initialState = {
  topCollectorList: topCollectorList,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCollectorList(state, { payload }) {
      state.topCollectorList = payload;
    },
  },
});

export default mainSlice;
