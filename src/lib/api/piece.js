import { api } from '../axios';

export const registerPieceApi = (formData) => {
  return api.post('/piece/register', formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const validateSetToSellingApi = (data, payload) => {
  const { requestKey, timestamp } = payload;
  data.requestKey = requestKey;
  data.timestamp = timestamp;
  return api.post('/smart-transaction/piece/sell', data);
};

export const setToSellingApi = (data, requestKey) => {
  return api.post(`/piece/sell?requestKey=${requestKey}`, data);
};
