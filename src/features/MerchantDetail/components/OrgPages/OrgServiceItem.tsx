import React from 'react';
import { Service } from '../../../../interface/service';
import { IOrganization } from '../../../../interface/organization';
import onErrorImg from '../../../../utils/errorImg';
import formatPrice from '../../../../utils/formatPrice';
import icon from '../../../../constants/icon';
import scrollTop from '../../../../utils/scrollTop';
import slugify from '../../../../utils/formatUrlString';
import { Link } from 'react-router-dom';
interface IProps {
    service: Service,
    org: IOrganization
}

function OrgServiceItem(props: IProps) {
    const { org, service } = props;
    return (
        <Link
            to={{
                pathname: `/dich-vu/${slugify(service?.service_name)}`,
                search: `id=${service.id}&org=${org?.id}`,
                state: { org, service },
            }}
            onClick={() => scrollTop()}
        >
            <div
                className="org-special-item"
            >
                <div className="org-special-item__img">
                    <div className="org-special-item__rate">
                        <div className="flex-row rate-item">
                            <img src={icon.cartCheckPurple} alt="" />
                            <span className="rate-item__count">{service?.bought_count}+</span>
                        </div>
                    </div>
                    <img
                        src={service?.image ? `${service?.image_url}` : `${org?.image_url}`}
                        onError={(e) => onErrorImg(e)}
                        alt=""
                    />
                </div>
                <div className="org-special-item__detail">
                    <div className="item-head">
                        <span className="item-head__name">{service?.service_name}</span>
                        {/* <span className="item-head__desc">{service?.description}</span> */}
                    </div>
                    {
                        service?.special_price > 0 ?
                            <div className="item-price">
                                <span className="item-price__special">
                                    {formatPrice(service?.special_price)}đ
                                </span>
                                <span className="item-price__old">
                                    {formatPrice(service?.price)}đ
                                </span>
                            </div>
                            :
                            <div className="item-price">
                                <span className="item-price__special">
                                    {formatPrice(service?.price)}đ
                                </span>
                            </div>
                    }
                </div>
            </div>
        </Link>
    );
}

export default OrgServiceItem;