import React from 'react';
import icon from '../../../constants/icon';
import { IServicePromo } from '../../../interface/servicePromo'
import onErrorImg from '../../../utils/errorImg';
import formatPrice from '../../../utils/formatPrice';
import slugify from '../../../utils/formatUrlString';
import scrollTop from '../../../utils/scrollTop';
import { useHistory } from 'react-router-dom'

function SectionServices(props: any) {
    const { services, setOpenSearch, hiddenFilter } = props;
    const history = useHistory();
    const gotoDetail = (service: IServicePromo) => {
        hiddenFilter()
        if(setOpenSearch){
            setOpenSearch(false)
        }
        scrollTop()
        history.push({
            pathname: `/dich-vu/${slugify(service.service_name)}`,
            search: `${service.org_id},${service.service_id},2`,
        })
    }
    return (
        <div
            className='filter-home-sec-item'
        >
            <span className="sec-title">
                Dịch vụ
            </span>
            <ul className="org-lits">
                {
                    services.slice(0, 3).map((item: IServicePromo, index: number) => (
                        <li
                            key={index}
                            onClick={() => gotoDetail(item)}
                        >
                            <div className="org-item">
                                <img
                                    onError={(e) => onErrorImg(e)}
                                    src={item?.image_url ? `${item.image_url}` : `${item?.org_image}`} alt=""
                                    className="org-item__img"
                                />
                                <div className="org-item__cnt">
                                    <span className="org-name">
                                        {item.service_name}
                                    </span>
                                    <div className="org-address">
                                        <img src={icon.pinMap} alt="" />
                                        <span>
                                            {item.org_district_name},{item.org_province_name}
                                        </span>
                                    </div>
                                    {
                                        item._geoDistance ?
                                            <>
                                                <div className="org-address">
                                                    <div className="dot"></div>
                                                    <div>
                                                        <span>Khoảng cách :
                                                            {
                                                                item._geoDistance < 1000 ?
                                                                    `${Math.round(item._geoDistance)}(m)`
                                                                    :
                                                                    `${Math.round(item._geoDistance / 1000)}(km)`
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }
                                    <div className="flex-row ser-price">
                                        {
                                            item.special_price > -1 ?
                                                <>
                                                    <span>{formatPrice(item.special_price)}đ</span>
                                                    <span>{formatPrice(item.price)}đ</span>
                                                </>
                                                :
                                                <span style={{ color: 'var(--purple)' }}>{formatPrice(item.price)}đ</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default SectionServices;