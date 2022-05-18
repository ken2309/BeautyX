import axiosClient from "./axios";
import { AUTH_HEADER, AUTH_HEADER_PARAM_DELE } from "../utils/authHeader";

class Favorite {
  postFavorite = (org_id: number) => {
    const params = {
      organization_id: org_id,
    };
    const url = `/favorites`;
    return axiosClient.post(url, params, AUTH_HEADER());
  };
  deleteFavorite = (org_id: number) => {
    const url = `/favorites`;
    const values = {
      organization_id: org_id
    }
    return axiosClient.delete(url, AUTH_HEADER_PARAM_DELE(values));
  };
}
const favorites = new Favorite();
export default favorites;
