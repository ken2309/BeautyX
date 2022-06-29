import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import icon from '../../../constants/icon';
import { IProductPromo } from '../../../interface/productPromo';
import { onSetStatusProduct } from '../../../redux/org_products/productSlice';
import { onToggleSearchCnt } from '../../../redux/search/searchSlice';
import onErrorImg from '../../../utils/errorImg';
import { formatDistance } from '../../../utils/format';
import formatPrice from '../../../utils/formatPrice';
import slugify from '../../../utils/formatUrlString';
import scrollTop from '../../../utils/scrollTop';

interface IProps {
    product: IProductPromo
}

function ProductResultItem(props: IProps) {
    const { product } = props;
    const dispatch = useDispatch();
    const distance = formatDistance(product?._geoDistance)

    const onItemClick = () => {
        scrollTop();
        dispatch(onToggleSearchCnt(false))
        dispatch(onSetStatusProduct("LOADING"))
    }

    return (
        <Link
            to={{
                pathname: `/product-detail/${slugify(product?.product_name)}`,
                search: `id=${product?.product_id}&org=${product?.org_id}`,
            }}
            className="service-result-item"
            onClick={onItemClick}
        >
            <img
                className='service-result-item__img'
                src={product?.image_url || product?.org_image}
                alt=""
                onError={(e) => onErrorImg(e)}
            />
            <div className="service-result-item__detail">
                <span className="name">{product?.product_name}</span>
                <div className="flex-row price">
                    {
                        product?.special_price > 0 ?
                            <>
                                <span>{formatPrice(product?.special_price)}đ</span>
                                <span>{formatPrice(product?.retail_price)}đ</span>
                            </>
                            :
                            <span>{formatPrice(product?.retail_price)}đ</span>
                    }
                </div>
                <div className="flex-row-sp bottom">
                    <div className="flex-row bottom-left">
                        <img src={product?.org_image} onError={(e) => onErrorImg(e)} alt="" />
                        <span>{product?.org_name}</span>
                    </div>
                    <div className="flex-row bottom-right">
                        <div className="flex-row bottom-right__item">
                            <img src={icon.star} alt="" className="item-icon" />
                            <span>{product?.rating}{" "}(987+)</span>
                        </div>
                        {
                            product?._geoDistance &&
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

export default ProductResultItem;