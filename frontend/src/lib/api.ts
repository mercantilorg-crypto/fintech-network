import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getAuthToken } from './auth';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
