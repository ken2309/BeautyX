import React from 'react';
import { Service } from '../../../../interface/service';
import { IOrganization } from '../../../../interface/organization';
import onErrorImg from '../../../../utils/errorImg';
import formatPrice from '../../../../utils/formatPrice';
import icon from '../../../../constants/icon';
import { useHistory } from 'react-router-dom'
import scrollTop from '../../../../utils/scrollTop';
import slugify from '../../../../utils/formatUrlString';

interface IProps {
    service: Service,
    org: IOrganization
}

function OrgServiceItem(props: IProps) {
    const { org, service } = props;
    const history = useHistory();
    const name = service?.service_name;
    const detail = service;
    const onDetail = () => {
        scrollTop();
        history.push({
            pathname: `/dich-vu/${slugify(name)}`,
            search: `${org.id},${detail.id},2`,
            state: { org, detail, name },
        });
    };
    return (
        <div onClick={onDetail} className="org-special-item">
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
                <div className="item-price">
                    <span className="item-price__special">
                        {formatPrice(service?.special_price)}đ
                    </span>

                    <span className="item-price__old">
                        {formatPrice(service?.price)}đ
                    </span>
                </div>
            </div>
        </div>
    );
}

export default OrgServiceItem;