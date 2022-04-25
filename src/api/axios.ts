import axios from 'axios';
import queryString from 'query-string';


const axiosClient = axios.create({
      // baseURL: process.env.REACT_APP_API_TEST,
      //baseURL: process.env.REACT_APP_API_URL,
      baseURL: process.env.REACT_APP_API_PRO,
      headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
      },
      paramsSerializer: params => queryString.stringify(params)
});
axiosClient.interceptors.request.use(async (config) => {
      return config;
})
axios.interceptors.response.use((response) => {
      if (response && response.data) {
            return response.data
      }
      return response;
}, (error) => {
      throw (error)
})

export default axiosClient;
export const baseURL = process.env.REACT_APP_API_URL;