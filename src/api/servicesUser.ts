import axiosClient from "./axios";
import { AUTH_HEADER_PARAM_GET } from "../utils/authHeader";



class ServicesUser {
    getServices = () => {
        const url = `/orders`;
        const params = {
            page: 1,
            limit: 15,
            "filter[status]": "PAID",
            "filter[withServicesSold]": true,
            "include": "items|items_count",
            "sort": "-created_at",
            'filter[platform]': 'BEAUTYX'
        }
        return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params))
    }
}
const servicesUserApi = new ServicesUser();
export default servicesUserApi;
