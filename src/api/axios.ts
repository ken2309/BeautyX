import axios from "axios";
import queryString from "query-string";

<<<<<<< HEAD
//export const baseURL = process.env.REACT_APP_API_TEST;
 export const baseURL = process.env.REACT_APP_API_URL;
=======
export const baseURL = process.env.REACT_APP_API_TEST;
// export const baseURL = process.env.REACT_APP_API_URL;
>>>>>>> b1ada437284a4b4182fa444d41980c72238c254e
//export const baseURL = process.env.REACT_APP_API_PRO;
const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    return config;
});
axios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;
