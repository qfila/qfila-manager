import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qfila-gateway-service.onrender.com/'
})

export default api;
