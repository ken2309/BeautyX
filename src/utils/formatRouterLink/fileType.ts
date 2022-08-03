import { IDiscountPar } from "../../interface/discount";
import formatPrice from "../formatPrice";
import moment from "moment";

const date = new Date();
const dayNow = moment(date).format("YYYY-MM-YY HH:MM:SS");
export const DISCOUNT_TYPE = {
    PRODUCT: {
        key: 'PRODUCT',
        text: "Giảm từng sản phẩm, dịch vụ"
    },
    SUB_TOTAL: {
        key: "SUB_TOTAL",
        text: "Giảm trên tổng đơn"
    },
    FINAL_PRICE: {
        key: "FINAL_PRICE",
        text: "Giá thanh toán"
    }
}
export const EX_APPLY_DATE = (discount: IDiscountPar) => {
    console.log(discount)
    let validDate = false;
    if (!discount.valid_from && !discount.valid_util) {
        validDate = true
    } else if (discount.valid_from && dayNow > discount.valid_from && !discount.valid_util) {
        validDate = true
    } else if (discount.valid_from < dayNow && discount.valid_util > dayNow) {
        validDate = true
    }
    return validDate
}
export const EX_DISCOUNT_UNIT = (discount: IDiscountPar) => {
    let value = ``;
    switch (discount.discount_unit) {
        case "PERCENT": return value = `${discount.discount_value}%`;
        case "PRICE": return value = `${formatPrice(discount.discount_value)}đ`;
        default: break
    }
    return value
}
export const EX_DISCOUNT_TYPE = (discount: IDiscountPar) => {
    const { discount_type } = discount
    let text = "";
    let TYPE=""
    const value = EX_DISCOUNT_UNIT(discount)
    switch (discount_type) {
        case DISCOUNT_TYPE.FINAL_PRICE.key:
            return text = DISCOUNT_TYPE.FINAL_PRICE.text;
        case DISCOUNT_TYPE.SUB_TOTAL.key:
            return text = `Giảm ${value} trên tổng đơn`;
        case DISCOUNT_TYPE.PRODUCT.key:
            return text = `Giảm ${value} trên sp, dv`;
        default:
            break
    }
    return text
}
export const EX_ORDER_VALUE = (discount: IDiscountPar) => {
    let title="";

}