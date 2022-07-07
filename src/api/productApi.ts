import axiosClient from "./axios";
import { pickBy, identity } from "lodash";
import { AUTH_HEADER_PARAM_GET } from "../utils/authHeader";
import { AUTH_LOCATION } from './authLocation';

class ProductApi {
    getByOrgId = (values: any) => {
        const url = `/organizations/${values.org_id}/products`;
        const params = {
            page: values.page,
            limit: 15,
        };
        return axiosClient.get(url, { params });
    };
    getByOrgId_cateId = (values: any) => {
        const url = `/organizations/${values.org_id}/products`;
        const paramsOb = {
            page: values.page || 1,
            limit: 15,
            "filter[keyword]": values.keyword,
            "filter[product_category_id]": values.cate_id,
            "filter[is_momo_ecommerce_enable]": values.isEnable,
            include: "favorites_count",
            append: "is_favorite|rating",
        };
        const params = pickBy(paramsOb, identity);
        return axiosClient.get(url, { params });
    };
    getDetailById = (values: any) => {
        const url = `/organizations/${values.org_id}/products/${values.id}`;
        const params = {
            include: "category|favorites_count",
            append: "is_favorite|rating",
        };
        return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params));
    };
    getBySearch = (params: any) => {
        const url = `/organizations/${params.org_id}/products?page=1&limit=15&filter%5Bkeyword%5D=${params.searchKey}`;
        return axiosClient.get(url);
    };
    getSpecialPriceByOrg_id = (values: any) => {
        const url = `/organizations/${values?.org_id}/products`;
        const params = {
            page: values.page,
            limit: 15,
            "filter[special]": true,
            "filter[is_momo_ecommerce_enable]": true,
        };
        return axiosClient.get(url, { params });
    };
    getByOrg_id = (values: any) => {
        const url = `/organizations/${values.org_id}/products`;
        const paramsOb = {
            page: values.page || 1,
            limit: 15,
            "filter[keyword]": values.keyword,
            "filter[service_group_id]": values.cate_id,
            include: "category|favorites_count",
            "filter[is_momo_ecommerce_enable]": values.isEnable,
            append: "is_favorite|rating",
        };
        const params = pickBy(paramsOb, identity);
        return axiosClient.get(url, { params });
    };
    getProductsAll = (values: any) => {
        const url = `/products`;
        const LOCATION = AUTH_LOCATION();
        const paramsOb = {
            page: values.page || 1,
            limit: 15,
            "filter[keyword]": values.keyword,
            "filter[min_price]": values.min_price || 1000,
            "filter[max_price]": values.max_price,
            "filter[special_min_price]": values.special_min_price || 1000,
            "filter[special_max_price]": values.special_max_price,
            "filter[discount_percent]": values.discount_percent,
            "filter[special_price]": values.special_price,
            "filter[is_momo_ecommerce_enable]": true,
            "filter[location]": values.sort === "distance" ? LOCATION : null,
            "sort": values.sort === "distance" ? null : values.sort
        }
        const params = pickBy(paramsOb, identity);
        return axiosClient.get(url, { params })
    }
}
const productsApi = new ProductApi();
export default productsApi;
