import { api } from '../axios';

export const loginUserApi = (token) => {
  return api.post('/user/login', {
    token: token,
  });
};

export const registerUserApi = (payload) => {
  return api.post('/user/register', payload);
};

export const getUserInfoApi = () => {
  return api.get('/user/info');
};

export const getTopCollectorApi = () => {
  return api.get('/user/top');
};

export const getUserImg = (userId) => {
  return api.get(`/user/${userId}/img`);
};
