export const formatAddCart = (
    item: any,
    org: any,
    is_type: any,
    quantity: any,
    sale_price: any,
    discount?: any,
    isConfirm?: boolean
) => {

    const cartValues = {
        id: item?.id,
        org_id: org?.id,
        org_name: org?.name,
        cart_id: parseInt(`${is_type}${org?.id}${item?.id}`), //is_type + org_id + id
        //name: item?.product_name ? item?.product_name : item?.service_name,
        name: item?.product_name || item?.service_name || item?.name,
        quantity: quantity,
        is_type: is_type,
        isConfirm: isConfirm ? isConfirm : false,
        price: sale_price,
        price_discount: discount ? sale_price - discount.discount_value : null,
        org: org,
        cart_item: item,
        discount: discount ? discount : null
    }
    return cartValues;
}