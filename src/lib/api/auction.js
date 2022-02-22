import { api } from '../axios';

export const getAuctionListApi = (category, sort) => {
  return api.get('/auction?category=all');
};

export const getAuctionDetailApi = (auctionId) => {
  return api.get(`/auction/${auctionId}`);
};

export const validateBuyPieceApi = (auctionId, payload) => {
  return api.post(`smart-transaction/auction/${auctionId}/buy`, payload);
};

export const buyPieceApi = (auctionId, requestKey) => {
  return api.post(`/auction/${auctionId}/buy?requestKey=${requestKey}`);
};
