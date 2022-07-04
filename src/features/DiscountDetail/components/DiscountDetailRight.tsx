import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../../constants/icon";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../../interface/discount";
import { IOrganization } from "../../../interface/organization";
import { addCart } from "../../../redux/cartSlice";
import {
    fetchAsyncCancelFavoriteService,
    fetchAsyncFavoriteService,
} from "../../../redux/org_services/serviceSlice";
import { clearAllServices } from "../../../redux/servicesBookSlice";
import { formatAddCart } from "../../../utils/cart/formatAddCart";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import useFullScreen from "../../../utils/useFullScreen";
import PopupSuccess from "../../PopupSuccess";
import DetailOrgCard from "../../ServiceDetail/components/DetailOrgCard";

 // ==== api tracking ====
 import tracking from "../../../api/trackApi";
 // end
// google tag event
import {GoogleTagPush,GoogleTagEvents} from '../../../utils/dataLayer';
// end 
interface IProps {
    discount: IDiscountPar;
    org: IOrganization;
    detail: any;
    NOW?: boolean
}

function DiscountDetailRight(props: IProps) {
    const { discount, org, detail, NOW } = props;
    const IS_MB = useFullScreen();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const ITEM_DISCOUNT: IITEMS_DISCOUNT = useSelector(
        (state: any) => state.ORG_DISCOUNTS.ITEM_DISCOUNT
    );
    const [popupSuccess, setPopupSuccess] = useState(false);
    const percent = Math.round(
        100 -
        (ITEM_DISCOUNT?.view_price / ITEM_DISCOUNT?.productable.price) * 100
    );
    const { USER } = useSelector((state: any) => state.USER);
    const history = useHistory();

    const valueService = {
        org_id: org?.id,
        detail: detail,
    };
    const onFavorite = async () => {
        if (USER) {
            if (detail.is_favorite === false) {
                await dispatch(fetchAsyncFavoriteService(valueService));
            } else {
                await dispatch(fetchAsyncCancelFavoriteService(valueService));
            }
        } else {
            history.push("/sign-in");
        }
    };

    const onDescQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const is_type = 2;
    const values = formatAddCart(
        detail,
        org,
        is_type,
        quantity,
        ITEM_DISCOUNT?.productable.price,
        discount
    );
    const handleAddCart = () => {
        tracking.ADD_CART_CLICK(values.org_id,values.id,values.price,values.quantity)
        GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
        dispatch(addCart(values));
        setPopupSuccess(true);
    };
    //handle booking now
    const onBookingNow = () => {
        const TYPE = "BOOK_NOW";
        const service = { ...detail, discount: discount };
        const services = [{ service, quantity: quantity }];
        console.log(service, services);
        tracking.ADD_CART_CLICK(values.org_id,values.id,values.price,values.quantity)
        GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
        history.push({
            pathname: "/dat-hen",
            state: { org, services, TYPE },
        });
        dispatch(clearAllServices());
    };
    return (
        <div className="service-detail__right">
            <div className="detail-right__head">
                <div className="detail-right__head-img">
                    <img
                        src={
                            detail?.image_url
                                ? detail?.image_url
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
                        <p>{detail?.service_name || detail?.product_name}</p>
                        <div onClick={onFavorite} className="favorite">
                            <img
                                src={
                                    detail?.is_favorite
                                        ? icon.heart
                                        : icon.unHeart
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
                            <p>{detail?.favorites_count}</p>
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
                        {percent !== 0 && (
                            <div className="detail-right__percent">
                                <p>Giảm {percent}%</p>
                            </div>
                        )}
                        <div className="detail-right__price">
                            <span>
                                {formatPrice(ITEM_DISCOUNT?.view_price)}đ
                            </span>
                            <span>
                                {formatPrice(ITEM_DISCOUNT?.productable.price)}đ
                            </span>
                        </div>
                    </div>
                    {/* <div className="service-detail__mobile-avi">
                        Lượt mua còn lại : {discount?.user_available_purchase_count}
                    </div> */}
                </div>
                <DetailOrgCard org={org} />
            </div>
            {quantity > 1 && (
                <div className="flex-row-sp detail-right__calc">
                    <span className="total-title">Tổng tiền</span>
                    <div className="total-math">
                        <span>
                            {formatPrice(
                                ITEM_DISCOUNT?.productable.price * quantity
                            )}
                            đ
                        </span>
                        <span>-{formatPrice(discount.discount_value)}đ</span>
                        <span>
                            {formatPrice(
                                ITEM_DISCOUNT?.productable.price * quantity -
                                discount.discount_value
                            )}
                            đ
                        </span>
                    </div>
                </div>
            )}
            {quantity > 1 && (
                <div className="detail-right__warn">
                    Giá dịch vụ đã thay đổi vì bạn chọn nhiều hơn số lượng được
                    áp dụng mã
                </div>
            )}
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
                {IS_MB ? (
                    <div className="flex-row flexX-gap-8">
                        {NOW ? (
                            <div
                                onClick={onBookingNow}
                                className="bottom-addCart bottom-buy__now"
                            >
                                <p>Đặt hẹn ngay</p>
                            </div>
                        ) : (
                            <div
                                onClick={handleAddCart}
                                className="bottom-addCart"
                            >
                                <img
                                    src={icon.ShoppingCartSimpleWhite}
                                    alt=""
                                />
                                <p>Thêm vào giỏ hàng</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-row flexX-gap-8">
                        <div
                            onClick={onBookingNow}
                            className="bottom-addCart bottom-buy__now"
                        >
                            <p>Đặt hẹn ngay</p>
                        </div>
                        <div onClick={handleAddCart} className="bottom-addCart">
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                            <p>Thêm vào giỏ hàng</p>
                        </div>
                    </div>
                )}
            </div>
            <PopupSuccess
                popup={popupSuccess}
                setPopup={setPopupSuccess}
                title={`Đã thêm ${detail?.service_name || detail?.product_name
                    } vào giỏ hàng`}
            />
        </div>
    );
}

export default DiscountDetailRight;
