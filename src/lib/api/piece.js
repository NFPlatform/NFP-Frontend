import { api } from '../axios';

export const registerPieceApi = (formData) => {
  return api.post('/piece/register', formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const setToSellingApi = (data) => {
  return api.post('/piece/sell', data);
};
