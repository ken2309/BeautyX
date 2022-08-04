import moment from "moment";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../interface/discount";
import { cartReducer, discountReducerItem } from "./cartReducer";
import { isEqual } from 'lodash'

const date = new Date();

const dayNow = moment(date).format("YYYY-MM-YY HH:MM:SS");
function unique(arr: any) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

export const EX_CHECK_DATE = (voucher: IDiscountPar) => {
    let dateCondition = false;
    if (!voucher.valid_from && !voucher.valid_util) {
        dateCondition = true
    } else if (voucher.valid_from && dayNow > voucher.valid_from && !voucher.valid_util) {
        dateCondition = true
    } else if (voucher.valid_from < dayNow && voucher.valid_util > dayNow) {
        dateCondition = true
    }
    return dateCondition
}
export const EX_CHECK_SUB_TOTAL = (
    totalAmount: number, voucher: IDiscountPar
) => {
    let subTotalCondition = false;
    if (!voucher.minimum_order_value || totalAmount > voucher.minimum_order_value) {
        subTotalCondition = true
    }
    return subTotalCondition
}
export const EX_CHECK_INCLUDE_ITEMS = (voucher: IDiscountPar, cartList: any[]) => {
    let itemCondition = false;
    const { products, services } = cartReducer(cartList)
    const { productsInDis, servicesInDis } = discountReducerItem(voucher.items);
    // console.log(productsInDis)
    const products_id = products.map((i: any) => i.id);
    const services_id = services.map((i: any) => i.id);
    const productsInDis_id = productsInDis.map((i: IITEMS_DISCOUNT) => i.productable_id);
    const servicesInDis_id = servicesInDis.map((i: IITEMS_DISCOUNT) => i.productable_id);

    // console.log("chil", products_id, services_id)
    // console.log("par", productsInDis_id, servicesInDis_id)

    const newProductArr = productsInDis_id.concat(products_id);
    const uniProductArr = unique(newProductArr)
    const newServiceArr = servicesInDis_id.concat(services_id);
    const uniServiceArr = unique(newServiceArr);

    const checkProductCartInDiscount = () => {
        let productCartInDis = false;
        if (products_id.length === 0) {
            return productCartInDis = false
        }
        if (isEqual(uniProductArr, productsInDis_id) || isEqual(uniProductArr, products_id)) {
            return productCartInDis = true
        }
        return productCartInDis
    }
    const checkServiceCartInDiscount = () => {
        let serviceCartInDis = false;
        if (services_id.length === 0) {
            return serviceCartInDis = false
        }
        if (isEqual(servicesInDis_id, uniServiceArr) || isEqual(services_id, uniServiceArr)) {
            return serviceCartInDis = true
        }
        return serviceCartInDis
    }
    const productCartInDis = checkProductCartInDiscount()
    const serviceCartInDis = checkServiceCartInDiscount()
    // console.log("productCartInDis", productCartInDis)
    // console.log("serviceCartInDis", serviceCartInDis)

    if (voucher.items.length === 0) {
        return itemCondition = true
    }
    if (productCartInDis || serviceCartInDis) {
        return itemCondition = true
    }
    return itemCondition
}