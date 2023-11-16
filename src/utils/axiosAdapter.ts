import axios from 'axios';

const axiosAdapter = axios.create({
  baseURL: import.meta.env.VITE_REACT_backend_endpoint,
  timeout: 5000,
});

export default axiosAdapter;
