import axios from 'axios';
import { URLS } from './constants';
const axiosInstance = axios.create({
  baseURL: URLS.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  async (config) => {
    // const token = await getSession();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token.accessToken}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
    //   signOut({ callbackUrl: '/' });
    } else if (error.response.status === 403) {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
