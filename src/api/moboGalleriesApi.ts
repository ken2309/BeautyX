import axiosClient from "./axios";

class MobaGalleries {
    getByOrgId = (org_id: any) => {
        const url = `/organizations/${org_id}/moba_galleries`;
        const params = {
            page: 1,
            limit: 15,
            "include": "images"
        }
        return axiosClient.get(url, { params })
    }
}
const galleriesApi = new MobaGalleries();
export default galleriesApi;