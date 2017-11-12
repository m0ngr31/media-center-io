import axios, {AxiosPromise} from 'axios';

import {Authentication} from './auth';

declare const process;

axios.defaults.baseURL = process.env.API_URL;
axios.interceptors.request.use((config) => {
  if (Authentication.checkAuth()) {
    config.headers.common['Authorization'] = Authentication.getAuthHeader();
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const Requests = (method, url, data): AxiosPromise => {
  let promise: AxiosPromise;

  switch (method) {
    case 'get':
      if (data) {
        promise = axios.get(url, {params: data});
      } else {
        promise = axios.get(url);
      }
      break;
    case 'post':
      promise = axios.post(url, data);
      break;
    case 'put':
      promise = axios.put(url, data);
      break;
  }

  return promise;
};
