import axiosClient from "./axios";

class TIKIAuth {
    login = (params: any) => {
        const url = `/auth/tiki`;
        // "customerId": "string",
        // "avatar": "string",
        // "email": "string",
        // "name": "string",
        // "phone": "string",
        // "authCode": "string"
        return axiosClient.post(url, params)
    }
}
const tikiAuthApi = new TIKIAuth();
export default tikiAuthApi