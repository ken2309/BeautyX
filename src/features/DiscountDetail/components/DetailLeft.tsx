import React from 'react';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../interface/discount';
import { IOrganization } from '../../../interface/organization'
import onErrorImg from '../../../utils/errorImg';

interface IProps {
    discount: IDiscountPar,
}

function DetailLeft(props: IProps) {
    const { discount } = props;
    const org: IOrganization = discount?.organizations[0]
    const discount_item_child: IITEMS_DISCOUNT = discount?.items[0];
    return (
        <div className="product-cnt__left">
            <img
                src={
                    discount_item_child?.productable?.image ?
                        discount_item_child?.productable?.image_url
                        :
                        org?.image_url
                }
                onError={(e) => onErrorImg(e)}
                alt=""
                className="product-cnt__left-img"
            />
        </div>
    );
}

export default DetailLeft;