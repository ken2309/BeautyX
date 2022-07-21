import React, { useContext } from "react";
import "./service-promo-item.css";
import { IServicePromo } from "../../../interface/servicePromo";
import icon from "../../../constants/icon";
import formatPrice from "../../../utils/formatPrice";
import { Link } from "react-router-dom";
import onErrorImg from "../../../utils/errorImg";
import scrollTop from "../../../utils/scrollTop";
import { formatRouterLinkServicePromo } from "../../../utils/formatRouterLink/formatRouter";

// ==== api tracking ====
//  import tracking from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { AppContext } from "../../../context/AppProvider";
// end

interface IProps {
    service: IServicePromo;
}

function ServicePromoItem(props: IProps) {
    const { service } = props;
    const { t } = useContext(AppContext);
    const patchServiceOb = formatRouterLinkServicePromo(service);
    return (
        <Link
            to={patchServiceOb}
            onClick={() => {
                scrollTop();
                GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
                // tracking.USER_ITEM_CLICK(service.org_id, service.id);
            }}
            className="ser-pro-item"
        >
            <div className="ser-img-cnt">
                <img
                    className="ser-img"
                    src={
                        service?.image_url
                            ? `${service.image_url}`
                            : `${service?.org_image}`
                    }
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
                <div className="ser-promo">
                    {
                        service.discount_percent > 0 &&
                        <div className="ser-promo__percent">
                            {t("detail_item.off")}{" "}
                            {Math.round(service?.discount_percent)}%
                        </div>
                    }
                    {/* {service.discount_percent > 0 &&
                    service.discount_percent < 50 ? (
                        <div className="ser-promo__percent">
                            {t("detail_item.off")}{" "}
                            {Math.round(service?.discount_percent)}%
                        </div>
                    ) : (
                        <div></div>
                    )} */}
                    <div className="flex-row ser-promo__bot">
                        <div className="flexX-gap-4 ser-promo__bot-start">
                            <img src={icon.star} alt="" />
                            {/* {service?.rating} */}
                            5
                        </div>
                        {/* <div className="flexX-gap-4 ser-promo__bot-bought">
                            <img src={icon.cartCheckPurple} alt="" />
                            <p>{service?.bought_count}</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="ser-pro-item__cnt">
                <span className="ser-name">{service?.service_name}</span>
                <div className="ser-price">
                    {service?.special_price === -1 ? (
                        <span style={{ color: "var(--purple)" }}>
                            {formatPrice(service?.price)}đ
                        </span>
                    ) : (
                        <>
                            <span>{formatPrice(service?.special_price)}đ</span>
                            <span>{formatPrice(service?.price)}đ</span>
                            {/* {service?.discount_percent < 50 && (
                                <span>{formatPrice(service?.price)}đ</span>
                            )} */}
                        </>
                    )}
                </div>
                {service._geoDistance ? (
                    <div className="flex-row ser-distance">
                        <div></div>
                        <span>
                            {t("se.distance")}
                            {": "}
                            {service._geoDistance < 1000
                                ? `${service._geoDistance}(m)`
                                : `${Math.round(
                                      service._geoDistance / 1000
                                  )}(km)`}
                        </span>
                    </div>
                ) : (
                    <></>
                )}
                <div className="ser-org-address">
                    <img src={icon.mapPinRed} alt="" />
                    <p>
                        {service?.org_district_name},
                        {service?.org_province_name}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ServicePromoItem;
// 