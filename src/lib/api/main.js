import { api } from '../axios';

export const getTopCollectorListApi = () => {
  return api.get(`/main/top-collector`);
};
