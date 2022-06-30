import React from 'react';
import '../ServicePromoItem/service-promo-item.css';
import { IProductPromo } from '../../../interface/productPromo'
import { Link } from 'react-router-dom';
import onErrorImg from '../../../utils/errorImg';
import icon from '../../../constants/icon';
import formatPrice from '../../../utils/formatPrice';
import scrollTop from '../../../utils/scrollTop';
import { formatRouterLinkProductPromo } from '../../../utils/formatRouterLink/formatRouter';

interface IProps {
    product: IProductPromo
}

function ProductPromoItem(props: IProps) {
    const { product } = props;
    const pathProductOb = formatRouterLinkProductPromo(product);
    return (
        <Link
            to={pathProductOb}
            onClick={() => scrollTop()}
            className="ser-pro-item"
        >
            <div className="ser-img-cnt">
                <img
                    className="ser-img"
                    src={
                        product?.image_url
                            ? `${product.image_url}`
                            : `${product?.org_image}`
                    }
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
                <div className="ser-promo">
                    {product.discount_percent > 0 &&
                        product.discount_percent < 50 ? (
                        <div className="ser-promo__percent">
                            Giảm {Math.round(product?.discount_percent)}%
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className="flex-row ser-promo__bot">
                        <div className="flexX-gap-4 ser-promo__bot-start">
                            <img src={icon.star} alt="" />
                            {product?.rating}
                        </div>
                        <div className="flexX-gap-4 ser-promo__bot-bought">
                            <img src={icon.cartCheckPurple} alt="" />
                            <p>{product?.bought_count}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ser-pro-item__cnt">
                <span className="ser-name">{product?.product_name}</span>
                <div className="ser-price">
                    {product?.special_price === -1 ? (
                        <span style={{ color: "var(--purple)" }}>
                            {formatPrice(product?.retail_price)}đ
                        </span>
                    ) : (
                        <>
                            <span>{formatPrice(product?.special_price)}đ</span>
                            {product?.discount_percent < 50 && (
                                <span>{formatPrice(product?.retail_price)}đ</span>
                            )}
                        </>
                    )}
                </div>
                {product._geoDistance ? (
                    <div className="flex-row ser-distance">
                        <div></div>
                        <span>
                            khoảng cách:
                            {product?._geoDistance < 1000
                                ? `${product?._geoDistance}(m)`
                                : `${Math.round(
                                    product?._geoDistance / 1000
                                )}(km)`}
                        </span>
                    </div>
                ) : (
                    <></>
                )}
                <div className="ser-org-address">
                    <img src={icon.mapPinRed} alt="" />
                    <p>
                        {product?.org_district_name},
                        {product?.org_province_name}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ProductPromoItem;