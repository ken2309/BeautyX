import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../../constants/icon";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import {
    onFavoriteOrg,
    onDeleteFavoriteOrg,
} from "../../../redux/org/orgSlice";
import { Link, useHistory } from "react-router-dom";
import {
    fetchAsyncCancelFavoriteService,
    fetchAsyncFavoriteService,
} from "../../../redux/org_services/serviceSlice";
import { formatAddCart } from "../../../utils/cart/formatAddCart";
import { addCart } from "../../../redux/cartSlice";

export default function ServiceDetailRight(props: any) {
    const { org, service } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const percent = service
        ? Math.round(100 - (service.special_price / service?.price) * 100)
        : null;
    const USER = useSelector((state: any) => state.USER);
    const ORG = useSelector((state: any) => state.ORG);
    const onFavoriteOrganization = async () => {
        if (USER) {
            if (org.is_favorite === false) {
                await dispatch(onFavoriteOrg(org));
            } else {
                await dispatch(onDeleteFavoriteOrg(org));
            }
        } else {
            history.push("/sign-in");
        }
    };
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
        if (quantity > 1) setQuantity(quantity - 1)
    }
    const handleAddCart = () => {
        const sale_price = service?.special_price > 0 ? service?.special_price : service?.price;
        const is_type = 2
        const values = formatAddCart(service, org, is_type, quantity, sale_price)
        dispatch(addCart(values))
    }
    return (
        <div className="service-detail__right">
            <div className="detail-right__head">
                <div className="detail-right__org">
                    <p>{org.name}</p>
                    <p>{"Đang mở cửa"}</p>
                </div>
                <div className="detail-right__name">
                    <p>{service.service_name}</p>
                    <div onClick={onFavorite} className="favorite">
                        <img src={service?.is_favorite ? icon.heart : icon.unHeart} alt="" />
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

            <div className="detail-right__body">
                <div className="detail-right__info">
                    <div className="flexX-gap-8">
                        <div className="detail-right__price">
                            {service.special_price > 0 ? (
                                <span
                                    className="price"
                                    style={{
                                        color: "var(--red-cl)",
                                        fontWeight: "bold",
                                        fontSize: "32px",
                                    }}
                                >
                                    {formatPrice(service.special_price)}đ
                                </span>
                            ) : (
                                <span
                                    style={{
                                        color: "var(--purple)",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {formatPrice(service.price)}đ
                                </span>
                            )}
                            <span
                                style={
                                    service.special_price < 0
                                        ? { display: "none" }
                                        : {}
                                }
                            >
                                <span
                                    style={{
                                        color: "rgb(128 128 137)",
                                        fontSize: "14px",
                                        lineHeight: "20px",
                                        textDecoration: "line-through",
                                        marginLeft: "8px",
                                    }}
                                >
                                    {formatPrice(service.price)}đ
                                </span>
                            </span>
                        </div>
                        <div className="detail-right__percent">
                            <p>Giảm {percent}%</p>
                        </div>
                    </div>

                    <div style={{ padding: "8px 0" }}>
                        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
                            Thời gian:
                        </p>
                        <div className="detail-right__duration flexX-gap-4">
                            <img src={icon.Clock_purple} alt="" />
                            <p>{service.duration} Phút</p>
                        </div>
                    </div>
                </div>

                <div className="detail-right__infoMer">
                    <div className="infoMer-top">
                        <div className="infoMer-top__img">
                            <img
                                onError={(e) => onErrorImg(e)}
                                src={org.image_url}
                                alt=""
                            />
                        </div>
                        <div className="infoMer-top__right">
                            <p className="infoMer-top__name">{org.name}</p>
                            <p className="infoMer-top__address">
                                {org.address ? org.address : org.full_address}
                            </p>
                        </div>
                    </div>
                    <div className="infoMer-mid">
                        <div className="infoMer-item">
                            <div className="infoMer-item__wrap flexX-gap-4">
                                <p>{"4.5/5"}</p>
                                <img src={icon.star} alt="" />
                            </div>
                            <p className="infoMer-item__text">Đánh giá</p>
                        </div>
                        <div className="infoMer-item">
                            <div className="infoMer-item__wrap flexX-gap-4">
                                <p>{ORG.org?.favorites_count}</p>
                                <img src={icon.Favorite} alt="" />
                            </div>
                            <p className="infoMer-item__text">Yêu thích</p>
                        </div>
                        <div className="infoMer-item">
                            <div className="infoMer-item__wrap flexX-gap-4">
                                <p>{"5"}</p>
                                <img src={icon.chatAll} alt="" />
                            </div>
                            <p className="infoMer-item__text">Bình luận</p>
                        </div>
                    </div>
                    <div className="infoMer-bottom">
                        <button className="infoMer-bottom__left">
                            <Link
                                className='flex-row'
                                to={{ pathname: `/org/${org.subdomain}` }}
                            >
                                <img src={icon.archive} alt="" />
                                <p>Xem Spa</p>
                            </Link>
                        </button>
                        {org?.is_favorite === true ? (
                            <button
                                onClick={onFavoriteOrganization}
                                className="infoMer-bottom__right infoMer-bottom__right-active"
                            >
                                <p className="infoMer-bottom__right-active">
                                    Đang Theo Dõi
                                </p>
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={onFavoriteOrganization}
                                    className="infoMer-bottom__right"
                                >
                                    <img src={icon.rss} alt="" />
                                    <p>Theo Dõi</p>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="detail-right__bottom">
                <div className="bottom-quantity">
                    <p className="bottom-quantity__text">Số lượng:</p>
                    <div className="bottom-quantity__wrap">
                        <button onClick={onDescQuantity} className="quantity-btn">
                            <p>-</p>
                        </button>
                        <input disabled value={quantity} className="quantity-input" type="text" />
                        <button onClick={() => setQuantity(quantity + 1)} className="quantity-btn">
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
