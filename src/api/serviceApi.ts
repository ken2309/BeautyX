import axiosClient from "./axios";

class ServiceApi {
  getByOrg_id = (values: any) => {
    const url = `/organizations/${values.org_id}/services`;
    const params = {
      page: values.page,
      limit: 15
    }
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
      "filter[is_momo_ecommerce_enable]": true
    }
    return axiosClient.get(url, { params })
  }
}
const serviceApi = new ServiceApi();
export default serviceApi;
