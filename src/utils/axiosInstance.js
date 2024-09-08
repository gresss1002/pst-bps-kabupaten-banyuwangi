// src/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-pst.vercel.app', // Ganti dengan URL server backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
