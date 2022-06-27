import React from 'react';
import formatPrice from '../../../utils/formatPrice';
import onErrorImg from '../../../utils/errorImg';
import { formatDistance } from '../../../utils/format';
import icon from '../../../constants/icon';
import slugify from '../../../utils/formatUrlString';
import { Link } from 'react-router-dom';
import { IProductPromo } from '../../../interface/productPromo';
import scrollTop from '../../../utils/scrollTop';

interface IProps {
    item: IProductPromo
}

function ProductCateItem(props: IProps) {
    const { item } = props;
    const distance = formatDistance(item?._geoDistance)
    return (
        <Link
            to={{
                pathname: `/product-detail/${slugify(item?.product_name)}`,
                search: `id=${item?.product_id}&org=${item?.org_id}`,
            }}
            onClick={() => scrollTop()}
            className="pr-result-cnt__list-item"
        >
            <img
                src={item.image_url ? item.image_url : item.org_image}
                alt=""
                className="item-img"
                onError={(e) => onErrorImg(e)}
            />
            <div className="item-detail">
                <span className="item-detail__name">{item.product_name}</span>
                <div className="flex-row item-detail__price">
                    {
                        item.special_price > 0 ?
                            <>
                                <span>{formatPrice(item.special_price)}đ</span>
                                <span>{formatPrice(item.retail_price)}đ</span>
                            </>
                            :
                            <span>{formatPrice(item.retail_price)}đ</span>
                    }
                </div>
                <div className="flex-row-sp item-detail__bot">
                    <div className="flex-row left">
                        <img src={item.org_image} onError={(e) => onErrorImg(e)} alt="" />
                        <div>{item.org_name}</div>
                    </div>
                    <div className="flex-row right">
                        <div className="flex-row right-item">
                            <img src={icon.star} alt="" className="img-icon" />
                            <span>4.5</span>
                        </div>
                        {
                            item?._geoDistance &&
                            <div className="flex-row right-item right-item-last">
                                <img src={icon.mapPinRed} alt="" className="img-icon" />
                                <span>{distance}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCateItem;