import axios from 'axios';

const api = axios.create({
  baseURL: '',
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
