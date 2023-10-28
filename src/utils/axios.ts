import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api'
});

axiosInstance.interceptors.request.use(function (req) {
  req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return req;
}, function (error) {
  console.error(error);
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error);
  if (error.response.data.message === 'jwt expired') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  return Promise.reject(error);
});

export default axiosInstance;