import { api } from '../axios';

export const getTopCollectorListApi = () => {
  return api.get(`/user/top`);
};

export const getHotArtistApi = () => {
  return api.get('/artist/top');
};
