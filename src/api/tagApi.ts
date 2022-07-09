import axiosClient from './axios';

class Tag {
      getAll = () => {
            const url = `/tags`;
            const params = {
                  "filter": "ORGANIZATION",
                  "include": "media",
                  "sort":"-organizations_count"
            }
            return axiosClient.get(url, { params });
      }
}
const tagsApi = new Tag();
export default tagsApi