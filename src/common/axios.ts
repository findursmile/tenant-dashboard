import axios from 'axios';

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
