import React from "react";
import icon from "../../../constants/icon";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";

export default function ServiceDetailLeft(props: any) {
    const { org, service } = props;
    const percent = service
        ? Math.round(100 - (service.special_price / service?.price) * 100)
        : null;
    return (
        <div className="service-detail__left flex-column">
            <div className="detail-left__img">
                <img
                    src={service.image_url ? service.image_url : org.image_url}
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
            </div>
            {/* detail service mobile */}
            <div className="service-detail__mobile">
                <div className="service-detail__mobile-top">
                    <p className="service-detail__mobile-name">
                        {service.service_name}
                    </p>
                    <div className="service-detail__mobile-favorite">
                        <img src={icon.favoriteStroke} alt="" />
                    </div>
                </div>

                <div className="service-detail__mobile-mid">
                    <img src={icon.alarmClock} alt="" />
                    <p className="service-detail__mobile-duration">
                        {service.duration} phút
                    </p>
                </div>

                <div className="service-detail__mobile-bottom">
                    <div className="service-detail__mobile-percent">
                        Giảm {percent}%
                    </div>
                    <div className="service-detail__mobile-price">
                        {service.special_price > 0 ? (
                            <span
                                className="price"
                                style={{
                                    color: "var(--red-cl)",
                                    fontWeight: "700",
                                    fontSize: "24px",
                                }}
                            >
                                {formatPrice(service.special_price)}đ
                            </span>
                        ) : (
                            <span
                                style={{
                                    color: "var(--purple)",
                                    fontWeight: "700",
                                    fontSize: "24px",
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
                                    color: "#8C8C8C",
                                    fontSize: "14px",
                                    textDecoration: "line-through",
                                    marginLeft: "8px",
                                    fontWeight: "500",
                                }}
                            >
                                {formatPrice(service.price)}đ
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
