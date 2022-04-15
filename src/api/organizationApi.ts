import axiosClient from "./axios";

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
    const session = window.sessionStorage.getItem("_WEB_TK");
    const local = localStorage.getItem("_WEB_TK")
    const url = `/organizations/${id}?withBranches=true`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `${session ? session : local}`,
      },
    });
  };
  getOrgByKeyword = (values: any) => {
    const location = JSON.stringify(`${location_user?.lat},${location_user?.long}`)
    const url = `/organizations?page=1&limit=15`;
    const params_string = `{
      "page":${values.page},
      "limit":15,
      "filter[keyword]":"${values.keyword}"
      ${values.tags.length > 0 ? `,"filter[tags]":${JSON.stringify(values.tags)}` : ''}
      ${values.province > 0 ? `,"filter[province_code]":${values.province}` : ''}
      ${values.price.min > 0 ? `,"filter[min_price]":${values.price.min}` : ''}
      ${values.price.max > 0 ? `,"filter[max_price]":${values.price.max}` : ''},
      ${!location_user || location_user === null ? '"include":"favorites_count|tags|branches"' : '"include":"favorites_count|tags"'}
      ${location_user ? `,"filter[location]":${location}` : ''}
    }`
    const params = JSON.parse(`${params_string}`);
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
  getOrgsByTrust = () => {
    const url = `/organizations`;
    const params = {
      page: 1,
      limit: 15,
      include: 'favorites_count|tags|branches'
    }
    return axiosClient.get(url, { params })
  }
  //
  getOrgsByManyDealHot = () => {
    const url = `/organizations`;
    const params = {
      page: 1,
      limit: 15,
      include: 'favorites_count|tags|branches',
      sort: '-priority'
    }
    return axiosClient.get(url, { params })
  }
  //
  getOrgsByDistance = () => {
    const url = `/organizations`;
    const params = {
      page: 1,
      limit: 15,
      include: 'favorites_count|tags|branches',
      "filter[location]": location_user ? `${location_user.lat},${location_user.long}` : ``
    }
    return axiosClient.get(url, { params })
  }
  //get by single tags
  getOrgsByTag = (values: any) => {
    const location = JSON.stringify(`${location_user?.lat},${location_user?.long}`)
    const url = `organizations`;
    const params_string = `{
      "page":${values.page},
      "limit":15,
      "filter[tags]":"${values.tag}"
      ${values.province > 0 ? `,"filter[province_code]":${values.province}` : ''}
      ${values.price.min >= 0 ? `,"filter[min_price]":${values.price.min}` : ''}
      ${values.price.max > 0 ? `,"filter[max_price]":${values.price.max}` : ''},
      ${!location_user || location_user === null ? '"include":"favorites_count|tags|branches"' : '"include":"favorites_count|tags"'}
      ${location_user ? `,"filter[location]":${location}` : ''}
    }`
    const params = JSON.parse(params_string)
    return axiosClient.get(url, { params })
  }
  //get by province code
  getOrgsByProvinceCode = (values: any) => {
    const location = JSON.stringify(`${location_user?.lat},${location_user?.long}`)
    const url = `organizations`;
    const params_string = `{
      "page":${values.page},
      "limit":15
      ${values.tags.length > 0 ? `,"filter[tags]":${JSON.stringify(values.tags)}` : ''}
      ${values.province > 0 ? `,"filter[province_code]":${values.province}` : ''}
      ${values.price.min > 0 ? `,"filter[min_price]":${values.price.min}` : ''}
      ${values.price.max > 0 ? `,"filter[max_price]":${values.price.max}` : ''},
      ${!location_user || location_user === null ? '"include":"favorites_count|tags|branches"' : '"include":"favorites_count|tags"'}
      ${location_user ? `,"filter[location]":${location}` : ''}
    }`
    const params = JSON.parse(params_string);
    return axiosClient.get(url, { params })
  }
}
const orgApi = new Organization();
export default orgApi;
