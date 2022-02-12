import { api } from '../axios';

export const getAuctionListApi = (category, sort) => {
  return api.get(`/auction`, {
    params: {
      category: category,
      sort: sort,
    },
  });
};
