import React from "react";
import "../ServicePromoItem/service-promo-item.css";
import { Product } from "../../../interface/product";
import { IOrganization } from "../../../interface/organization";
import formatPrice from "../../../utils/formatPrice";
import onErrorImg from "../../../utils/errorImg";
import { useHistory } from "react-router-dom";
import slugify from "../../../utils/formatUrlString";
import scrollTop from "../../../utils/scrollTop";

interface IProps {
    product: Product;
    org: IOrganization;
    changeStyle?: boolean,
}

function ProductItem(props: IProps) {
    const { product, org, changeStyle } = props;
    const name = product?.product_name;
    const detail = product;
    const history = useHistory();
    const onDetail = () => {
        scrollTop();
        history.push({
            pathname: `/product-detail/${slugify(product?.product_name)}`,
            search: `${org.id},${product.id},1`,
            state: { org, detail, name },
        });
    };
    const percent = Math.round(
        100 - (product?.special_price / product?.retail_price) * 100
    );
    return (
        <div onClick={onDetail} className={changeStyle ? "ser-pro-item ser-pro-item__change" : "ser-pro-item"}>
            <div className={changeStyle ? "ser-img-cnt ser-img-cnt__change" : "ser-img-cnt"}>
                <img
                    className={changeStyle ? "ser-img ser-img__change":"ser-img"}
                    src={product?.image ? product.image_url : org?.image_url}
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
                <div className="ser-promo">
                    {product?.special_price > 0 && (
                        <div className="ser-promo__percent">
                            Giảm <br /> {percent} %
                        </div>
                    )}
                    {/* <div className="flex-row ser-promo__bot">
                        <div className="flex-row ser-promo__bot-start">
                            5
                            <img src={icon.star} alt="" />
                        </div>
                        <div className="ser-promo__bot-bought">
                            Lượt mua
                            <span>120</span>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="ser-pro-item__cnt">
                <span className="ser-name">{product?.product_name}</span>
                <div
                    className={changeStyle ? "ser-price ser-price__change" : "ser-price"}
                >
                    {product?.special_price === -1 ? (
                        <span style={{ color: "var(--purple)" }}>
                            {formatPrice(product?.retail_price)}đ
                        </span>
                    ) : (
                        <>
                            <span>{formatPrice(product?.special_price)}đ</span>
                            <span>{formatPrice(product?.retail_price)}đ</span>
                        </>
                    )}
                </div>
                {/* {
                    service._geoDistance ?
                        <div className="flex-row ser-distance">
                            <div></div>
                            <span>khoảng cách:
                                {
                                    service._geoDistance < 1000 ?
                                        `${service._geoDistance}(m)`
                                        :
                                        `${Math.round(service._geoDistance / 1000)}(km)`
                                }
                            </span>
                        </div>
                        :
                        <></>
                } */}
                <div className="ser-org-address">
                    <img src={org?.image_url} onError={(e)=>onErrorImg(e)} alt="" />
                    <p>{org?.address}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
