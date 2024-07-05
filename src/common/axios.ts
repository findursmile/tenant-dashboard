import axios from 'axios';
import { tokenKey } from '../context/AuthContext';

export const API_HOSTNAME = 'http://localhost:8080/';

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

axios.interceptors.response.use((res) => {
    if (res.status == axios.HttpStatusCode.Unauthorized) {
        localStorage.removeItem(tokenKey);
        location.href = '/auth/signin';
    }
    return res;
}, res => {
    if (res.response.status == axios.HttpStatusCode.Unauthorized) {
        localStorage.removeItem(tokenKey);
        location.href = '/auth/signin';
    }

});
