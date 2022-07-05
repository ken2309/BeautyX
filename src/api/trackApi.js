
import MiniApi from '@momo-miniapp/api';
import { pickBy, identity } from 'lodash';
MiniApi.init({ appId: process.env.REACT_APP_MOMO_APP_ID });
/**
 * @name MOMO_API
 * @description send event tracking to MOMO APPLITCATION
 * @returns {object} message
 */
export async function MOMO_API(EVENT_NAME, PARAMs) {
    try {
        const params = pickBy(PARAMs, identity)
        // const res = await MiniApi.track(EVENT_NAME, {
        //     service_name: 'myspa',
        //     ...params
        // });
        //   alert(JSON.stringify(EVENT_NAME+JSON.stringify(params)+JSON.stringify(res)));
        //return res
    } catch (err) {
        console.log(err);
    }
}
// ==== interface for params ====
// interface PRODUCT_LIST {
//     product_id: Number,
//     quantity: Number,
//     price: Number

// }
// interface RESULT {
//     store_id: any,
//     product_id?: String | Number
// }
// ==== end ====

export const COMPONENT_NAME = {
    ORG: 'doanh nghiệp',
    AREA: 'khu vực',
    SERVICE: 'dịch vụ',
    PRODUCT: 'sản phẩm',
    HOT_DEAL: 'khuyến mãi hot',
    LOW_PRICE: 'giá thấp',
    NEAR_BY: 'gần bạn'
}
// ===================

class TRACKING_EVENT {
    HOME_LOAD = () => {
        const params = {
            EVENT_NAME: 'service_screen_viewed',
            PARAMs: {
                screen_name: 'home',
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    SEARCH_CLICK = () => {
        const params = {
            EVENT_NAME: 'service_search_clicked',
            PARAMs: {
                screen_name: 'home',
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    SEARCH_ON_CHANGE = (keyword) => {
        const params = {
            EVENT_NAME: 'service_search_inputed',
            PARAMs: {
                screen_name: 'home',
                keyword: keyword
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    SEARCH_RESULT_LOAD = (quantity, keyword) => {
        const params = {
            EVENT_NAME: 'service_search_result_viewed',
            PARAMs: {
                screen_name: 'search_result',
                quantity: quantity,
                keyword: keyword
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    SEARCH_RESULT_ITEM_CLICK = (keyword, result, component_name, position) => {
        const params = {
            EVENT_NAME: 'service_search_result_clicked',
            PARAMs: {
                screen_name: 'search_result',
                keyword: keyword,
                result: result,
                component_name: component_name,
                position: position
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    SEARCH_RESULT_ORG_LOAD = (store_id) => {
        const params = {
            EVENT_NAME: 'service_screen_viewed',
            PARAMs: {
                screen_name: 'storelist',
                store_id: store_id
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    LIST_ORG_LOAD = (store_id) => {
        const params = {
            EVENT_NAME: 'service_screen_viewed',
            PARAMs: {
                screen_name: 'storelist',
                store_id: store_id
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    DISCOOUNT_ITEM_CLICK = (store_id, component_name, voucher_id) => {
        const params = {
            EVENT_NAME: 'service_product_clicked',
            PARAMs: {
                screen_name: 'home',
                button_name: 'voucher',
                store_id: store_id,
                component_name: component_name,
                product_id: voucher_id
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    BANNER_CLICK = (banner_id) => {
        const params = {
            EVENT_NAME: 'service_button_clicked',
            PARAMs: {
                screen_name: 'home',
                button_name: 'banner',
                banner_id: banner_id
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    VIDEO_SCREEN_LOAD = () => {
        const params = {
            EVENT_NAME: 'service_screen_viewed',
            PARAMs: {
                screen_name: 'trending'
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    CALENDAR_CLICK = () => {
        const params = {
            EVENT_NAME: 'service_screen_viewed',
            PARAMs: {
                screen_name: 'appointment'
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    CATEGORY_TREE_LOAD = () => {
        const params = {
            EVENT_NAME: 'service_screen_viewed',
            PARAMs: {
                screen_name: 'category'
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    CATEGORY_TREE_ITEM_CLICK = (category_id, store_id, product_id) => {
        const params = {
            EVENT_NAME: 'service_product_clicked',
            PARAMs: {
                screen_name: 'category',
                category_id: category_id,
                store_id: store_id,
                product_id: product_id
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    USER_ITEM_CLICK = (store_id, product_id) => {
        const params = {
            EVENT_NAME: 'service_product_clicked',
            PARAMs: {
                screen_name: 'menu',
                store_id: store_id,
                product_id: product_id
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    ADD_CART_CLICK = (store_id, product_id, price, quantity, option) => {
        const params = {
            EVENT_NAME: 'service_button_clicked',
            PARAMs: {
                screen_name: 'menu',
                button_name: 'add_product',
                store_id: store_id,
                product_id: product_id,
                price: price,
                option: [
                    ...(option || []),
                    {
                        quantity: quantity
                    }
                ]
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    PAY_CLICK = (store_id, product_list) => {
        const params = {
            EVENT_NAME: 'service_product_continued',
            PARAMs: {
                screen_name: 'menu',
                store_id: store_id,
                product_list: product_list
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    CONFIRM_SCREEN_LOAD = (store_id, product_list, price) => {
        const params = {
            EVENT_NAME: 'service_screen_viewed',
            PARAMs: {
                screen_name: 'cart_view',
                price: price,
                store_id: store_id,
                product_list: product_list,
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    CART_DELETE_ALL_CLICK = () => {
        const params = {
            EVENT_NAME: 'service_screen_viewed',
            PARAMs: {
                screen_name: 'cart_view',
                button_name: 'delete_cart',
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
    PAY_CONFIRM_CLICK = (store_id, product_list) => {
        const params = {
            EVENT_NAME: 'service_product_continued',
            PARAMs: {
                screen_name: 'order_info',
                store_id: store_id,
                product_list: product_list
            }
        }
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    }
}
export const EVENT = new TRACKING_EVENT();
export default EVENT;

function extraParamsUrl() {
    throw new Error('Function not implemented.');
}
