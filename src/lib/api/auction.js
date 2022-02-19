import { api } from '../axios';

export const getAuctionListApi = (category, sort) => {
  return api.get('/auction?category=all');
};

export const getAuctionDetailApi = (auctionId) => {
  return api.get(`/auction/${auctionId}`);
};

export const buyPieceApi = (auctionId) => {
  return api.post(`/auction/${auctionId}/buy`);
};
