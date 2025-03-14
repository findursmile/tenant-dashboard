import axios from 'axios';
import { tokenKey } from '../context/AuthContext';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URI;
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
