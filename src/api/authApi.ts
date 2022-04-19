import axiosClient from "./axios";
import { AUTH_HEADER } from "../utils/authHeader";

class Auth {
  login = (values: any) => {
    const url = `/auth/login`;
    const params = {
      ...values,
      "platform": "BEAUTYX"
    }
    return axiosClient.post(url, params);
  };
  register = (params: any) => {
    const url = `/auth/register`;
    return axiosClient.post(url, params);
  };
  getUserProfile = () => {
    const url = `/users/profile`;
    //const session = window.sessionStorage.getItem("_WEB_TK");
    //const local = localStorage.getItem("_WEB_TK")
    if (localStorage.getItem("_WEB_TK") || window.sessionStorage.getItem("_WEB_TK")) {
      return axiosClient.get(url, AUTH_HEADER());
    }
  };
}
const auth = new Auth();
export default auth;
