import React from 'react';
import formatPrice from '../../utils/formatPrice';

function ProductItem(props: any) {
    const { product, quantity } = props;
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;