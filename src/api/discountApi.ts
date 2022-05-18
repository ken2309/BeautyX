import axiosClient from "./axios";

class Discounts {
    getAll = (values: any) => {
        const url = `/discounts`;
        const params = {
            "page": values.page,
            "limit": 14,
            "filter[platform]": "MOMO", // update change platform "BEAUTYX"
            "append": "user_available_purchase_count",
            "sort": "discount_value|created_at"
        }
        return axiosClient.get(url, { params })
    }
    getByOrgId = (values: any) => {
        const url = `/discounts`;
        const params = {
            "page": 1,
            "limit": 14,
            "filter[platform]": "MOMO", // update change platform "BEAUTYX"
            "append": "user_available_purchase_count",
            "sort": "discount_value|created_at",
            "filter[organization_id]": values.org_id
        }
        return axiosClient.get(url, { params })
    }
}
const discountApi = new Discounts();
export default discountApi;