import axios from 'axios';
import { getToken } from './authStorage';

const instance = axios.create({
  baseURL: 'http://192.168.1.16:3000/api/v1',
  timeout: 10000,
});



instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Auth error:', error.response.data);
      await removeToken();
      router.replace('/login');
    }

    return Promise.reject(error);
  }
);


export default instance;