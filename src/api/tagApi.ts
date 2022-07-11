import axiosClient from './axios';

class Tag {
      getAll = () => {
            const url = `/tags`;
            const params = {
                  "filter": "ORGANIZATION",
                  "include": "media",
                  "sort": "-organizations_count"
            }
            return axiosClient.get(url, { params });
      }
      getServicesChild = () => {
            const url = `/tags`;
            const params = {
                  "page":2,
                  "filter[group]": "SERVICE",
                  "include": "children.media|media",
                  "sort": "-organizations_count"
            }
            return axiosClient.get(url, { params })
      }
}
const tagsApi = new Tag();
export default tagsApi