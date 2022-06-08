import React, { useState } from "react";
import { Product } from "../../../interface/product";
import { IOrganization } from "../../../interface/organization";
import icon from "../../../constants/icon";
import formatPrice from "../../../utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    onFavoriteProduct,
    onDeleteFavorite,
} from "../../../redux/org_products/productSlice";
import { formatAddCart } from "../../../utils/cart/formatAddCart";
import { addCart } from "../../../redux/cartSlice";
import DetailOrgCard from '../../ServiceDetail/components/DetailOrgCard';
import onErrorImg from "../../../utils/errorImg";

interface IProps {
    product: Product;
    org: IOrganization;
}

function ProductDetailRight(props: IProps) {
    const { org, product } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const { USER } = useSelector((state: any) => state.USER);
    const [quantity, setQuantity] = useState(1);

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
    const percent = Math.round(
        100 - (product?.special_price / product?.retail_price) * 100
    );
    //handle add cart
    const onDescQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const handleAddCart = () => {
        const sale_price =
            product?.special_price > 0
                ? product?.special_price
                : product.retail_price;
        const is_type = 1;
        const values = formatAddCart(
            product,
            org,
            is_type,
            quantity,
            sale_price
        );
        dispatch(addCart(values));
    };
    return (
        <div className="service-detail__right">
            <div className="detail-right__head">
                <div className="detail-right__head-img">
                    <img
                        src={
                            product?.image_url
                                ? product?.image_url
                                : org.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
                <div className="detail-right__head-info">
                    <div className="detail-right__org">
                        <p>{org?.name}</p>
                        <p>{"Đang mở cửa"}</p>
                    </div>
                    <div className="detail-right__name">
                        <p>{product?.product_name}</p>
                        <div onClick={onFavorite} className="favorite">
                            <img
                                src={
                                    product?.is_favorite ? icon.heart : icon.unHeart
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="detail-right__evaluate">
                        <div className="evaluate-item">
                            <p>5</p>
                            <img src={icon.star} alt="" />
                        </div>
                        <div className="evaluate-item">
                            <p>{product?.favorites_count}</p>
                            <img src={icon.Favorite} alt="" />
                        </div>
                        <div className="evaluate-item">
                            <p>10</p>
                            <img src={icon.ShoppingCartSimple} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-right__body">
                <div className="detail-right__info">
                    <div className="flexX-gap-8">
                        {product?.special_price > 0 && (
                            <div className="detail-right__percent">
                                <p>Giảm {percent}%</p>
                            </div>
                        )}
                        <div className="detail-right__price">
                            {product?.special_price > 0 ? (
                                <>
                                    <span>
                                        {formatPrice(product?.special_price)}đ
                                    </span>
                                    <span>
                                        {formatPrice(product?.retail_price)}đ
                                    </span>
                                </>
                            ) : (
                                <span>
                                    {formatPrice(product?.retail_price)}đ
                                </span>
                            )}
                        </div>
                    </div>
                    {/* <div style={{ padding: "8px 0" }}>
                        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
                            Thời gian:
                        </p>
                        <div className="detail-right__duration flexX-gap-4">
                            <img src={icon.Clock_purple} alt="" />
                            <p>{service.duration} Phút</p>
                        </div>
                    </div> */}
                </div>
                <DetailOrgCard org={org} />
            </div>
            <div className="detail-right__bottom">
                <div className="bottom-quantity">
                    <p className="bottom-quantity__text">Số lượng:</p>
                    <div className="bottom-quantity__wrap">
                        <button
                            onClick={onDescQuantity}
                            className="quantity-btn"
                        >
                            <p>-</p>
                        </button>
                        <input
                            value={quantity}
                            disabled
                            className="quantity-input"
                            type="text"
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="quantity-btn"
                        >
                            <p>+</p>
                        </button>
                    </div>
                </div>
                <div onClick={handleAddCart} className="bottom-addCart">
                    <img src={icon.ShoppingCartSimpleWhite} alt="" />
                    <p>Thêm vào giỏ hàng</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailRight;
