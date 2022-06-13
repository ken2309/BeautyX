import React, { useState } from "react";
import { useDispatch } from "react-redux";
import icon from "../../../constants/icon";
import { Combo } from "../../../interface/combo";
import { IOrganization } from "../../../interface/organization";
import { addCart } from "../../../redux/cartSlice";
import { formatAddCart } from "../../../utils/cart/formatAddCart";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import PopupSuccess from "../../PopupSuccess";
import "../../ProductDetail/product.css";
import DetailOrgCard from "../../ServiceDetail/components/DetailOrgCard";

interface IProps {
    combo: Combo;
    org: IOrganization;
}

function ComboDetailRight(props: IProps) {
    const { combo, org } = props;
    const dispatch = useDispatch();
    const list_price = [combo?.price, combo?.use_value].sort((a, b) => b - a);
    const price = list_price[0];
    const special_price = list_price[1];
    const percent = Math.round(100 - (special_price / price) * 100);
    const [popupSuccess, setPopupSuccess] = useState(false);
    //handle add cart
    const [quantity, setQuantity] = useState(1);
    const onDescQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const handleAddCart = () => {
        const sale_price = special_price;
        const is_type = 3;
        const values = formatAddCart(combo, org, is_type, quantity, sale_price);
        dispatch(addCart(values));
        setPopupSuccess(true);
    };
    return (
        <div className="service-detail__right">
            <div className="detail-right__head">
                <div className="detail-right__head-img">
                    <img
                        src={org?.image_url}
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
                        <p>{combo?.name}</p>
                        <div
                            //onClick={onFavorite}
                            className="favorite"
                        >
                            <img src={icon.heart} alt="" />
                        </div>
                    </div>
                    <div className="detail-right__evaluate">
                        <div className="evaluate-item">
                            <p>5</p>
                            <img src={icon.star} alt="" />
                        </div>
                        <div className="evaluate-item">
                            <p>112+</p>
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
                        <div className="detail-right__price">
                            <span>{formatPrice(special_price)}đ</span>
                            <span>{formatPrice(price)}đ</span>
                        </div>
                        {percent > 0 && (
                            <div className="detail-right__percent">
                                <p>Giảm {percent}%</p>
                            </div>
                        )}
                    </div>
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
            <PopupSuccess
                popup={popupSuccess}
                setPopup={setPopupSuccess}
                title={`Đã thêm ${combo?.name} vào giỏ hàng`}
            />
        </div>
    );
}

export default ComboDetailRight;
