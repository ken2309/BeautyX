import React from 'react';
import { Product } from '../../../interface/product';
import { IOrganization } from '../../../interface/organization'
import onErrorImg from '../../../utils/errorImg';

interface IProps {
    product: Product,
    org: IOrganization
}

function ProductDetailLeft(props: IProps) {
    const { product, org } = props;
    return (
        <>
            <div className="service-detail__left">
                <div className="detail-left__img">
                    <img
                        src={
                            product?.image_url
                                ? product?.image_url
                                : org?.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
            </div>
            <div className="service-detail__info"></div>
        </>
    );
}

export default ProductDetailLeft;