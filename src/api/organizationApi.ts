import axiosClient from "./axios";
import { AUTH_HEADER } from "../utils/authHeader";
import { pickBy, identity } from 'lodash';
import { AUTH_LOCATION } from "./authLocation";

const location_user = JSON.parse(`${sessionStorage.getItem('USER_LOCATION')}`)

class Organization {
  getOrgBrById = (props: any) => {
    //console.log(props)
    let id = props.id || props;
    let withBranches = props.branches || true;
    const url = `/organizations/${id}?withBranches=${withBranches}`;
    return axiosClient.get(url);
  };
  getOrgById = (id: any) => {
    const url = `/organizations/${id}`;
    return axiosClient.get(url, AUTH_HEADER());
  };
  getOrgByKeyword = (values: any) => {
    const url = `/organizations`;
    const LOCATION = AUTH_LOCATION();
    const paramsOb = {
      "page": values.page || 1,
      "limit": 15,
      "filter[keyword]": values.keyword,
      "sort": "-priority",
      "filter[tags]": values.tags,
      "filter[province_code]": values.province,
      "filter[min_price]": values.price?.min,
      "filter[max_price]": values.price?.max,
      "include": "favorites_count|tags|branches",
      "filter[location]": LOCATION
    }
    const params = pickBy(paramsOb, identity);
    return axiosClient.get(url, { params })
  };
  getOrgByFilter = (values: any) => {
    const url = `/organizations`
    const params = {
      page: 1,
      limit: 15,
      'filter[tags]': values.params.tags,
      'filter[province_code]': values.params.provinceCode,
      'filter[min_price]': values.params.minPrice,
      'filter[max_price]': values.params.maxPrice,
      'include': 'branches'
    }
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_WEB_TK"),
      },
    })
  }
  //example get all
  getAll = () => {
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK");
    const url = `/organizations?page=1&limit=15`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${session ? session : local}`,
      },
    });
  };
  //
  getOrgsByTrust = (values: any) => {
    const url = `/organizations`;
    const paramsOb = {
      page: 1,
      limit: 15,
      include: 'favorites_count|tags|branches',
      sort: "-priority",
      "filter[tags]": values.tags,
      "filter[province_code]": values.province_code,
      "filter[min_price]": values.price?.min,
      "filter[max_price]": values.price?.max
    }
    const params = pickBy(paramsOb, identity)
    return axiosClient.get(url, { params })
  }
  //
  getOrgsByManyDealHot = (values: any) => {
    const url = `/organizations`;
    const paramsOb = {
      page: values.page,
      limit: 15,
      include: 'favorites_count|tags|branches',
      sort: '-priority',
      "filter[tags]": values.tags,
      "filter[province_code]": values.province_code,
      "filter[min_price]": values.price?.min,
      "filter[max_price]": values.price?.max
    }
    const params = pickBy(paramsOb, identity)
    return axiosClient.get(url, { params })
  }
  //
  getOrgsByDistance = (values: any) => {
    const url = `/organizations`;
    const paramsOb = {
      page: values.page,
      limit: 15,
      include: 'favorites_count|tags|branches',
      "filter[tags]": values.tags,
      "filter[min_price]": values.price?.min,
      "filter[max_price]": values.price?.max,
      "filter[location]": `${location_user.lat},${location_user.long}`,
    }
    const params = pickBy(paramsOb, identity)
    return axiosClient.get(url, { params })
  }
  //get by single tags
  getOrgsByTag = (values: any) => {
    const url = `organizations`;
    const paramsOb = {
      "page": values.page,
      "limit": 15,
      "filter[tags]": values.tag,
      "filter[province_code]": values.province,
      "filter[min_price]": values.price?.min,
      "filter[max_price]": values.price?.max,
      "filter[location]": `${location_user?.lat},${location_user?.long}`,
      "include": "favorites_count|tags|branches"
    }
    const params = pickBy(paramsOb, identity)
    return axiosClient.get(url, { params })
  }
  //get by province code
  getOrgsByProvinceCode = (values: any) => {
    const url = `organizations`;
    const paramsOb = {
      "page": values.page,
      "limit": 15,
      "include": "favorites_count|tags|branches",
      "filter[tags]": values?.tags,
      "filter[province_code]": values?.province,
      "filter[min_price]": values?.price?.min,
      "filter[max_price]": values?.price?.max,
      "filter[location]": `${location_user?.lat},${location_user?.long}`
    }
    const params = pickBy(paramsOb, identity);
    return axiosClient.get(url, { params })
  }
}
const orgApi = new Organization();
export default orgApi;
