import React from 'react';
import { IServicePromo } from '../../../interface/servicePromo';
import { Link } from 'react-router-dom'
import slugify from '../../../utils/formatUrlString';
import onErrorImg from '../../../utils/errorImg';
import formatPrice from '../../../utils/formatPrice';
import icon from '../../../constants/icon';
import { onToggleSearchCnt } from '../../../redux/search/searchSlice'
import { useDispatch } from 'react-redux';
import { formatDistance } from '../../../utils/format';
import scrollTop from '../../../utils/scrollTop';

interface IProps {
    service: IServicePromo
}

function ServiceResultItem(props: IProps) {
    const { service } = props;
    const dispatch = useDispatch();
    const distance = formatDistance(service?._geoDistance)
    const onItemClick = () => {
        scrollTop();
        dispatch(onToggleSearchCnt(false))
    }
    return (
        <Link
            to={{
                pathname: `/dich-vu/${slugify(service?.service_name)}`,
                search: `id=${service.service_id}&org=${service.org_id}`,
            }}
            className="service-result-item"
            onClick={onItemClick}
        >
            <img
                className='service-result-item__img'
                src={service?.image_url || service?.org_image}
                alt=""
                onError={(e) => onErrorImg(e)}
            />
            <div className="service-result-item__detail">
                <span className="name">{service?.service_name}</span>
                <div className="flex-row price">
                    {
                        service?.special_price > 0 ?
                            <>
                                <span>{formatPrice(service?.special_price)}đ</span>
                                <span>{formatPrice(service?.price)}đ</span>
                            </>
                            :
                            <span>{formatPrice(service?.price)}đ</span>
                    }
                </div>
                <div className="flex-row-sp bottom">
                    <div className="flex-row bottom-left">
                        <img src={service?.org_image} onError={(e) => onErrorImg(e)} alt="" />
                        <span>{service?.org_name}</span>
                    </div>
                    <div className="flex-row bottom-right">
                        <div className="flex-row bottom-right__item">
                            <img src={icon.star} alt="" className="item-icon" />
                            <span>{service?.rating}{" "}(987+)</span>
                        </div>
                        {
                            service?._geoDistance &&
                            <div style={{ marginLeft: "18px" }} className="flex-row bottom-right__item">
                                <img src={icon.mapPinRed} alt="" className="item-icon" />
                                <span>{distance}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ServiceResultItem;