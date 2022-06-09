import React from "react";
import { Product } from "../../../interface/product";
import { IOrganization } from "../../../interface/organization";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import icon from "../../../constants/icon";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    onFavoriteProduct,
    onDeleteFavorite,
} from "../../../redux/org_products/productSlice";

interface IProps {
    product: Product;
    org: IOrganization;
}

function ProductDetailLeft(props: IProps) {
    const { product, org } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const percent = Math.round(
        100 - (product?.special_price / product?.retail_price) * 100
    );
    const { USER } = useSelector((state: any) => state.USER);
    const onFavorite = () => {
        if (USER) {
            const values = {
                product: product,
                org_id: org?.id,
            };
            if (product.is_favorite) {
                dispatch(onDeleteFavorite(values));
            } else {
                dispatch(onFavoriteProduct(values));
            }
        } else {
            history.push("/sign-in?1");
        }
    };
    return (
        <>
            <div className="service-detail__left">
                <div className="detail-left__img">
                    <img
                        src={
                            product?.image_url
                                ? product?.image_url
                                : org?.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
                {/* detail service mobile */}
                <div className="service-detail__mobile">
                    <div className="service-detail__mobile-top">
                        <p className="service-detail__mobile-name">
                            {product?.product_name}
                        </p>
                        <div
                            onClick={onFavorite}
                            className="service-detail__mobile-favorite"
                        >
                            <img
                                src={
                                    product?.is_favorite
                                        ? icon.heart
                                        : icon.unHeart
                                }
                                alt=""
                            />
                        </div>
                    </div>

                    {/* <div className="service-detail__mobile-mid">
                        <img src={icon.alarmClock} alt="" />
                        <p className="service-detail__mobile-duration">
                            {product.duration} phút
                        </p>
                    </div> */}

                    <div className="service-detail__mobile-bottom">
                        {product?.special_price > 0 && (
                            <div className="service-detail__mobile-percent">
                                Giảm {percent}%
                            </div>
                        )}
                        <div className="service-detail__mobile-price">
                            {product?.special_price > 0 ? (
                                <>
                                    <span>
                                        {formatPrice(product?.special_price)}đ
                                    </span>
                                    <span>
                                        {formatPrice(product?.retail_price)}
                                    </span>
                                </>
                            ) : (
                                <span>
                                    {formatPrice(product?.retail_price)}đ
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailLeft;
