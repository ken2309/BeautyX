import React from 'react';
import { IServicePromo } from '../../src/interface/servicePromo';
import style from './ServicePromo.module.css';
import Link from 'next/link';
import slugify from '../../src/utils/formatUrlString';
import icon from '../../src/constants/icon';
import onErrorImg from '../../src/utils/errorImg';
import formatPrice, { formatSalePriceService } from '../../src/utils/formatPrice';
import { formatDistance } from "../../src/utils/format";
import Image from 'next/image'


interface IProps {
    service: IServicePromo
}


function ServicePromoItem(props: IProps) {
    const { service } = props;
    const serviceSaleSpecial = formatSalePriceService(service.special_price, service?.special_price_momo)
    return (
        <Link
            href={`/${slugify(service.service_name)}?ser_id=${service.service_id}`}
        >
            <a className={style.ser_pro_item}>
                <div className={style.ser_img_cnt}>
                    {service.org_image !== '' && service.org_image !== null && <img src={service.org_image} className={style.ser_img__org_logo} onError={(e) => onErrorImg(e)} alt="" />}
                    <img
                        className={style.ser_img}
                        src={
                            service?.image_url
                                ? `${service.image_url}`
                                : `${service?.org_image}`
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                    <div className={style.ser_promo}>
                        {
                            service.discount_percent > 0 &&
                            <div className={style.ser_promo__percent}>
                                Giảm{" "}
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
                        <div className={style.ser_promo__bot}>
                            <div className={style.ser_promo__bot_start}>
                                <Image width={16} height={16} src={icon.star} alt="" />
                                {
                                    service.rating === 5 ? 5 : `4.${service?.rating}`
                                }
                            </div>
                            {/* <div className="flexX-gap-4 ser-promo__bot-bought">
                            <img src={icon.cartCheckPurple} alt="" />
                            <p>{service?.bought_count}</p>
                        </div> */}
                        </div>
                    </div>
                </div>
                <div className={style.ser_pro_item__cnt}>
                    <span className={style.ser_name}>{service?.service_name}</span>
                    <div className={style.ser_price}>
                        {serviceSaleSpecial > 0 ?
                            (
                                <>
                                    <span className={style.ser_price_special} > {formatPrice(serviceSaleSpecial)}đ</span>
                                    <span className={style.ser_price_old}>{formatPrice(service?.price)}đ</span>
                                </>
                            )
                            :
                            (
                                <span className={style.ser_price_special} style={{ color: "var(--purple)" }}>
                                    {formatPrice(service?.price)}đ
                                </span>
                            )}
                    </div>
                    {service._geoDistance ? (
                        <div className="flex-row ser-distance">
                            <div></div>
                            <span>
                                Khoảng cách
                                {": "}
                                {formatDistance(service?._geoDistance)}
                            </span>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className={style.ser_org_address}>
                        <Image src={icon.mapPinRed} alt="" />
                        <p className={style.ser_org_address_p}>
                            {service?.org_district_name},
                            {service?.org_province_name}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    );
}

export default ServicePromoItem;