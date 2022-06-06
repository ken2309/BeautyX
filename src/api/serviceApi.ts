import axiosClient from "./axios";
import { pickBy, identity } from 'lodash'

class ServiceApi {
  getByOrg_id = (values: any) => {
    const url = `/organizations/${values.org_id}/services`;
    const paramsOb = {
      page: values.page || 1,
      limit: 15,
      "filter[keyword]": values.keyword,
      "filter[service_group_id]": values.cate_id,
      "include": "category|favorites_count",
      "append": "is_favorite|rating|bought_count"
    }
    const params = pickBy(paramsOb, identity)
    return axiosClient.get(url, { params });
  };
  getByOrgId_cateId = (values: any) => {
    const url = `/organizations/${values.org_id}/services`;
    const params = {
      page: values.page,
      limit: 15,
      "filter[service_group_id]": values.cate_id
    }
    return axiosClient.get(url, { params });
  };
  getDetailById = (params: any) => {
    const url = `/organizations/${params.org_id}/services/${params.ser_id}`;
    return axiosClient.get(url);
  };
  getBySearch = (params: any) => {
    const url = `/organizations/${params.org_id}/services?page=1&limit=15&filter%5Bkeyword%5D=${params.searchKey}`;
    return axiosClient.get(url);
  };
  getSpecialPriceByOrg_id = (values: any) => {
    const url = `/organizations/${values.org_id}/services`;
    const params = {
      limit: 15,
      page: values.page,
      "filter[special]": true,
      "filter[is_momo_ecommerce_enable]": true,
      "include": "category|favorites_count",
      "append": "is_favorite|rating|bought_count"
    }
    return axiosClient.get(url, { params })
  }
}
const serviceApi = new ServiceApi();
export default serviceApi;
