import axios from 'axios';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = "Bearer tokern"
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
