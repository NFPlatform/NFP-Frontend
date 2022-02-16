import { api } from '../axios';

export const getAuctionListApi = (category, sort) => {
  return api.get('/auction?category=all');
};
