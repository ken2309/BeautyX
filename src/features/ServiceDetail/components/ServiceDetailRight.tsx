import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../../constants/icon";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import {
    fetchAsyncCancelFavoriteService,
    fetchAsyncFavoriteService,
} from "../../../redux/org_services/serviceSlice";
import { formatAddCart } from "../../../utils/cart/formatAddCart";
import { addCart } from "../../../redux/cartSlice";
import PopupSuccess from "../../PopupSuccess";
import DetailOrgCard from "./DetailOrgCard";

export default function ServiceDetailRight(props: any) {
    const { org, service } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [popupSuccess, setPopupSuccess] = useState(false);
    const percent = service
        ? Math.round(100 - (service.special_price / service?.price) * 100)
        : null;
    const { USER } = useSelector((state: any) => state.USER);

    const valueService = {
        org_id: org?.id,
        detail: service,
    };
    const onFavorite = async () => {
        if (USER) {
            if (service.is_favorite === false) {
                await dispatch(fetchAsyncFavoriteService(valueService));
            } else {
                await dispatch(fetchAsyncCancelFavoriteService(valueService));
            }
        } else {
            history.push("/sign-in");
        }
    };
    //handle add cart
    const [quantity, setQuantity] = useState(1);
    const onDescQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const handleAddCart = () => {
        const sale_price =
            service?.special_price > 0
                ? service?.special_price
                : service?.price;
        const is_type = 2;
        const values = formatAddCart(
            service,
            org,
            is_type,
            quantity,
            sale_price
        );
        setPopupSuccess(true);
        dispatch(addCart(values));
    };
    return (
        <div className="service-detail__right">
            <div className="detail-right__head">
                <div className="detail-right__head-img">
                    <img
                        src={
                            service.image_url
                                ? service.image_url
                                : org.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
                <div className="detail-right__head-info">
                    <div className="detail-right__org">
                        <p>{org.name}</p>
                        <p>{"Đang mở cửa"}</p>
                    </div>
                    <div className="detail-right__name">
                        <p>{service.service_name}</p>
                        <div onClick={onFavorite} className="favorite">
                            <img
                                src={
                                    service?.is_favorite
                                        ? icon.heart
                                        : icon.unHeart
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="detail-right__evaluate">
                        <div className="evaluate-item">
                            <p>{service.rating}</p>
                            <img src={icon.star} alt="" />
                        </div>
                        <div className="evaluate-item">
                            <p>{service.favorites_count}</p>
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
                        {service?.special_price > 0 && (
                            <div className="detail-right__percent">
                                <p>Giảm {percent}%</p>
                            </div>
                        )}
                        <div className="detail-right__price">
                            {service?.special_price > 0 ? (
                                <>
                                    <span>
                                        {formatPrice(service?.special_price)}đ
                                    </span>
                                    <span>{formatPrice(service?.price)}đ</span>
                                </>
                            ) : (
                                <span>{formatPrice(service?.price)}đ</span>
                            )}
                        </div>
                    </div>

                    <div className="detail-right__duration-wrap">
                        <p>Thời gian:</p>
                        <div className="detail-right__duration flexX-gap-4">
                            <img src={icon.alarmClock} alt="" />
                            <p>{service.duration} Phút</p>
                        </div>
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
                            disabled
                            value={quantity}
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
                title={`Đã thêm ${service.service_name} vào giỏ hàng`}
            />
        </div>
    );
}
