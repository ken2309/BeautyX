import axiosClient from "./axios";

class MOMOAuth {
    login = (params: any) => {
        const url = `/auth/momo`;
        // const params = {
        //     "fullname": "Nguyen Ngoc Toan",
        //     "email": "toan@myspa.vn",
        //     "telephone": "0392645745"
        // }
        return axiosClient.post(url, params)
    }
}
const momoAuthApi = new MOMOAuth();
export default momoAuthApi