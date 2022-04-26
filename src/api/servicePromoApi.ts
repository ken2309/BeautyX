import axiosClient from "./axios";

const location_user = JSON.parse(`${sessionStorage.getItem('USER_LOCATION')}`)

class ServicePromo {
    getByKeyword = (values: any) => {
        const url = `/services`;
        const params = {
            page: values.page,
            limit: 20,
            "filter[is_momo_ecommerce_enable]": true,
            "filter[keyword]": values.keyword,
            "filter[location]": location_user ? `${location_user.lat},${location_user.long}` : ``
        }
        return axiosClient.get(url, { params })
    }
    getBySort = (values: any) => {
        const url = `/services`;
        const params = {
            page: values.page,
            limit: 20,
            "filter[keyword]": values.keyword,
            "filter[special_price]": true,
            "filter[is_momo_ecommerce_enable]": true,
            "sort": values.dataSort
        }
        return axiosClient.get(url, { params })
    }
    getBySortFeature = (values: any) => {
        const url = `/services`;
        const params = {
            page: values.page,
            limit: 20,
            "filter[keyword]": values.keyword,
            "filter[is_momo_ecommerce_enable]": true,
            "filter[is_featured]": true,
            "sort": "-modified_date"
        }
        return axiosClient.get(url, { params })
    }
    getByUserLocation = (values: any) => {
        const url = `/services`;
        const params = {
            page: values.page,
            limit: 20,
            "filter[keyword]": values.keyword,
            "filter[is_momo_ecommerce_enable]": true,
            "filter[location]": location_user ? `${location_user.lat},${location_user.long}` : ``
        }
        return axiosClient.get(url, { params })
    }
    //services promo
    getServicesPromo = (values: any) => {
        const url = `/services`;
        const params = {
            page: values.page,
            limit: 24,
            "filter[special_price]": true,
            "filter[is_momo_ecommerce_enable]": true,
            "sort": values.sort
        }
        return axiosClient.get(url, { params })
    }
    //
    getServicesPromoLocation = (values: any) => {
        const url = `/services`;
        const params = {
            page: values.page,
            limit: 30,
            "filter[special_price]": true,
            "filter[is_momo_ecommerce_enable]": true,
            "filter[location]": location_user ? `${location_user.lat},${location_user.long}` : ``
        }
        return axiosClient.get(url, { params })
    }
    //services recommend user
    getServicesRe = () => {
        const url = `/services`;
        const params = {
            page: 1,
            limit: 30,
            "filter[is_featured]": true,
            "filter[is_momo_ecommerce_enable]": true,
            "sort": "random",
        }
        return axiosClient.get(url, { params })
    }
}
const servicePromoApi = new ServicePromo();
export default servicePromoApi