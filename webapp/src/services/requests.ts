import axios, {AxiosPromise} from 'axios';

import {Authentication} from './auth';

declare const process: any;

axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.request.use((config) => {
  if (Authentication.checkAuth()) {
    config.headers.common['Authorization'] = Authentication.getAuthHeader();
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(res => res, err => {
  if (err.response && err.response.status === 401) {
    Authentication.logout();
  }
  return Promise.reject(err);
});

export const Requests = {
  post: (url: string, data: any): AxiosPromise => {
    return axios.post(url, data);
  },

  get: (url: string, data?: any): AxiosPromise => {
    return axios.get(url, { params: data || {} });
  },

  put: (url: string, data: any): AxiosPromise => {
    return axios.put(url, data);
  }
};
