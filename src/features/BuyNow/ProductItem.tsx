import React from 'react';
import formatPrice from '../../utils/formatPrice';
import { DISCOUNT_TYPE } from '../../utils/formatRouterLink/fileType';

function ProductItem(props: any) {
    const { product, quantity } = props;
    let DISCOUNT_FINAl = false;
    if (product.discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key) {
        DISCOUNT_FINAl = true
    }
    return (
        <div className='buy-now-item'>
            <div className="product-item">
                <img src={product.image_url} alt="" className="product-item__img" />
            </div>
            <div className="product-item__detail">
                <span className="product-item__detail-name">
                    {product.product_name}
                </span>
                <div className="product-item__detail-total">
                    <span className="quantity">x {quantity}</span>
                    <div className="price">
                        {
                            DISCOUNT_FINAl ?
                                <span>{formatPrice(product.discount?.discount_value)}</span>
                                :
                                <>
                                    {
                                        product.special_price > 0 ?
                                            <>
                                                <span style={{ color: "var(--orange)" }} >{formatPrice(product.special_price)}đ</span>
                                                <span>{formatPrice(product.retail_price)}đ</span>
                                            </>
                                            :
                                            <span>
                                                {formatPrice(product.retail_price)}đ
                                            </span>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;