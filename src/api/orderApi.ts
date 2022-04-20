import axiosClient from './axios';
import { AUTH_HEADER_PARAM_GET, AUTH_HEADER } from '../utils/authHeader';

class Order {
      getOrder = (page: number) => {
            const url = `/orders?sort=-id&page=${page}&limit=4`;
            return axiosClient.get(url, AUTH_HEADER())
      }
      getOrders = (page: number) => {
            const url = '/orders'
            const params = {
                  page: page,
                  limit: 10,
                  include: 'items|items_count',
                  sort: '-created_at',
                  'filter[platform]': 'BEAUTYX',
                  'filter[productable]': true,
            }
            return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params))
      }
      postOrder = (org_id: number, params: object) => {
            const data = JSON.stringify(params);
            const url = `/organizations/${org_id}/orders`;
            return axiosClient.post(url, data, AUTH_HEADER())
      }
}
const order = new Order();
export default order