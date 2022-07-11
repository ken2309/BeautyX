import React, { useContext, useState } from "react";
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

// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import DiscountDetailRightReview from "./DiscountDetailRightReview";
import { extraOrgTimeWork } from "../../MerchantDetail/components/Functions/extraOrg";
import { AppContext } from "../../../context/AppProvider";
// end
interface IProps {
    discount: IDiscountPar;
    org: IOrganization;
    detail: any;
    NOW?: boolean;
}

function DiscountDetailRight(props: IProps) {
    const { discount, org, detail, NOW } = props;
    const IS_MB = useFullScreen();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const ITEM_DISCOUNT: IITEMS_DISCOUNT = useSelector(
        (state: any) => state.ORG_DISCOUNTS.ITEM_DISCOUNT
    );
    const { t } = useContext(AppContext);
    const { COMMENTS } = useSelector((state: any) => state.SERVICE);
    const [popupSuccess, setPopupSuccess] = useState(false);
    const percent = Math.round(
        100 -
            (ITEM_DISCOUNT?.view_price / ITEM_DISCOUNT?.productable.price) * 100
    );
    const { USER } = useSelector((state: any) => state.USER);
    const history = useHistory();
    // get today's activity date in org
    const now = new Date();
    const today = now.getDay() + 1;
    const orgTimes: any = org && extraOrgTimeWork(org?.opening_time);
    const time_works_today = orgTimes?.find(
        (item: any, index: number) => index + 2 === today
    );
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
        GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
        dispatch(addCart(values));
        setPopupSuccess(true);
    };
    //handle booking now
    const onBookingNow = () => {
        const TYPE = "BOOK_NOW";
        const service = { ...detail, discount: discount };
        const services = [{ service, quantity: quantity }];
        // console.log(service, services);
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
                        {time_works_today?.status && (
                            <>
                                {time_works_today?.status === "on" ? (
                                    <p style={{ color: "var(--green)" }}>{`${t(
                                        "detail_item.open"
                                    )}`}</p>
                                ) : (
                                    <p style={{ color: "var(--red_2)" }}>{`${t(
                                        "detail_item.close"
                                    )}`}</p>
                                )}
                            </>
                        )}
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

                    {ITEM_DISCOUNT?.productable && COMMENTS && (
                        <DiscountDetailRightReview
                            data={ITEM_DISCOUNT?.productable}
                            comment={COMMENTS}
                        />
                    )}
                </div>
            </div>

            <div className="detail-right__body">
                <div className="detail-right__info">
                    <div className="flexX-gap-8">
                        {percent !== 0 && (
                            <div className="detail-right__percent">
                                <p>
                                    {`${t("detail_item.off")}`} {percent}%
                                </p>
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
                    <span className="total-title">
                        {t("cart.total_payment")}
                    </span>
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
                    {t("cart.limit_item_discount")}
                </div>
            )}
            <div className="detail-right__bottom">
                <div className="bottom-quantity">
                    <p className="bottom-quantity__text">
                        {t("detail_item.quantity")}:
                    </p>
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
                                <p>{t("detail_item.booking_now")}</p>
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
                                <p>{t("detail_item.add_cart")}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-row flexX-gap-8">
                        <div
                            onClick={onBookingNow}
                            className="bottom-addCart bottom-buy__now"
                        >
                            <p>{t("detail_item.booking_now")}</p>
                        </div>
                        <div onClick={handleAddCart} className="bottom-addCart">
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                            <p>{t("detail_item.add_cart")}</p>
                        </div>
                    </div>
                )}
            </div>
            <PopupSuccess
                popup={popupSuccess}
                setPopup={setPopupSuccess}
                title={`Đã thêm ${
                    detail?.service_name || detail?.product_name
                } vào giỏ hàng`}
            />
        </div>
    );
}

export default DiscountDetailRight;
