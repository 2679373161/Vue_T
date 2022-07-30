import axios from 'axios';
import storageService from '../service/storageService';

const service = axios.create({
  baseURL: 'http://127.0.0.1:1016/api/', // process.env.VUE_APP_BASE_URL,
  timeout: 1000 *60 , // 请求时间
});
//http://47.98.170.3:443/api/api
//http://47.98.170.3:1016/api/
// http://121.41.178.102:1016/api/
//'http://127.0.0.1:1016/api/'
// Add a request interceptor
service.interceptors.request.use((config) => {
  // Do something before request is sent
  Object.assign(config.headers, { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` });
  return config;
}, (error) => {

  // Do something with request errorZ
  return Promise.reject(error);
});

export default service;
