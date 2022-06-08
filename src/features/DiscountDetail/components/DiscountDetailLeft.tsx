import React from 'react';
import icon from '../../../constants/icon';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../interface/discount';
import { IOrganization } from '../../../interface/organization'
import onErrorImg from '../../../utils/errorImg';
import formatPrice from '../../../utils/formatPrice';

interface IProps {
    discount: IDiscountPar,
    org: IOrganization
}

function DiscountDetailLeft(props: IProps) {
    const { discount, org } = props;
    console.log(discount);
    const discount_item_child: IITEMS_DISCOUNT = discount?.items[0];
    const percent = Math.round(100 - discount_item_child?.view_price / discount_item_child.productable.price)
    return (
        <div className="service-detail__left">
            <div className="detail-left__img">
                <img
                    src={
                        discount_item_child.productable.image
                            ? discount_item_child?.productable?.image_url
                            : org?.image_url
                    }
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
            </div>
            {/* detail service mobile */}
            <div className="service-detail__mobile">
                <div className="service-detail__mobile-top">
                    <p className="service-detail__mobile-name">
                        {discount?.title}
                    </p>
                    <div
                        //onClick={onFavorite}
                        className="service-detail__mobile-favorite"
                    >
                        <img src={icon.unHeart} alt="" />
                    </div>
                </div>

                <div className="service-detail__mobile-mid">
                    <img src={icon.alarmClock} alt="" />
                </div>

                <div className="service-detail__mobile-bottom">
                    <div className="service-detail__mobile-percent">
                        Giảm {percent}%
                    </div>
                    <div className="service-detail__mobile-price">
                        <span>{formatPrice(discount_item_child.view_price)}đ</span>
                        <span>{formatPrice(discount_item_child.productable.price)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscountDetailLeft;