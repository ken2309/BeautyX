import React from "react";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import "../ServicePromoItem/service-promo-item.css";
import { Service } from "../../../interface/service";
import { IOrganization } from "../../../interface/organization";
import { useHistory } from "react-router-dom";
import slugify from "../../../utils/formatUrlString";
import scrollTop from "../../../utils/scrollTop";

interface IProps {
    service: Service;
    org: IOrganization;
    changeStyle?: boolean;
}

function ServiceItem(props: IProps) {
    const { service, org, changeStyle } = props;
    const history = useHistory();
    const percent: any = Math.round(
        100 - (service?.special_price / service?.price) * 100
    );
    const onDetail = () => {
        scrollTop();
        history.push({
            pathname: `/dich-vu/${slugify(service?.service_name)}`,
            search: `id=${service.id}?org=${org?.id}`,
            state: { org, service },
        });
    };
    return (
        <div
            onClick={onDetail}
            className={
                changeStyle
                    ? "ser-pro-item ser-pro-item__change"
                    : "ser-pro-item"
            }
        >
            <div
                className={
                    changeStyle
                        ? "ser-img-cnt ser-img-cnt__change"
                        : "ser-img-cnt"
                }
            >
                <img
                    className={
                        changeStyle ? "ser-img ser-img__change" : "ser-img"
                    }
                    src={
                        service?.image_url ? service.image_url : org?.image_url
                    }
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
                <div className="ser-promo">
                    {service.special_price > 0 && percent < 50 && (
                        <div className="ser-promo__percent">
                            Giảm {percent} %
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
                <span className="ser-name">{service?.service_name}</span>
                <div
                    className={
                        changeStyle
                            ? "ser-price ser-price__change"
                            : "ser-price"
                    }
                >
                    {service?.special_price === -1 ? (
                        <span style={{ color: "var(--purple)" }}>
                            {formatPrice(service?.price)}đ
                        </span>
                    ) : (
                        <>
                            <span>{formatPrice(service?.special_price)}đ</span>
                            {percent < 50 && (
                                <span>{formatPrice(service?.price)}đ</span>
                            )}
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
                    <img
                        onError={(e) => onErrorImg(e)}
                        src={org?.image_url}
                        alt=""
                    />
                    <p>{org?.address}</p>
                </div>
            </div>
        </div>
    );
}

export default ServiceItem;
