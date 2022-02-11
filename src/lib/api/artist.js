import { api } from '../axios';

export const registerArtistApi = (formData) => {
  return api.post('/artist/register', formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};
