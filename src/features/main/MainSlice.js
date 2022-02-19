import { createSlice } from '@reduxjs/toolkit';

const topCollectorList = [
  {
    name: 'J.G',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: '스란',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: '엉뽕양',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: '박땡글',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: '탱찌',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: '토깽이',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: '블루레몬에이드',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: '서이율',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: '우파',
    klay: 120,
    thumbnailImg: '',
  },
  {
    name: '핫구당근',
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
