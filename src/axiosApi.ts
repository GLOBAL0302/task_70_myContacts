import axios from 'axios';

const axiosApi = axios.create({
  baseURL: import.meta.env.BASE_URL,
})

export default axiosApi