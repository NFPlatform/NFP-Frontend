import axios from 'axios';
import { PRODUCTION_BACKEND_URL } from './constant';

const api = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === 'production' ? PRODUCTION_BACKEND_URL : '',
});

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('nfptoken');
    if (token !== null && token !== undefined) {
      request.headers.common.Authorization = `Token ${token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { api };
