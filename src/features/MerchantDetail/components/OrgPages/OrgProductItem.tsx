import React from 'react';
import { IOrganization } from '../../../../interface/organization';
import { Product } from '../../../../interface/product';
import onErrorImg from '../../../../utils/errorImg';
import formatPrice from '../../../../utils/formatPrice';
import icon from '../../../../constants/icon';
import { useHistory } from 'react-router-dom';
import scrollTop from '../../../../utils/scrollTop';
import slugify from '../../../../utils/formatUrlString';

interface IProps {
    product: Product,
    org: IOrganization
}

function OrgProductItem(props: IProps) {
    const { product, org } = props;
    const name = product?.product_name;
    const detail = product;
    const history = useHistory();
    const onDetail = () => {
        scrollTop();
        history.push({
            pathname: `/product-detail/${slugify(product?.product_name)}`,
            search: `${org.id},${product.id},1`,
            state: { org, detail, name },
        });
    };
    return (
        <div onClick={onDetail} className="org-special-item">
            <div className="org-special-item__img">
                <div className="org-special-item__rate">
                    <div className="flex-row rate-item">
                        <img src={icon.cartCheckPurple} alt="" />
                        <span className="rate-item__count">112+</span>
                    </div>
                </div>
                <img
                    src={product?.image ? `${product?.image_url}` : `${org?.image_url}`}
                    onError={(e) => onErrorImg(e)}
                    alt=""
                />
            </div>
            <div className="org-special-item__detail">
                <div className="item-head">
                    <span className="item-head__name">{product?.product_name}</span>
                    {/* <span className="item-head__desc">{product?.description}</span> */}
                </div>
                <div className="item-price">
                    <span className="item-price__special">
                        {formatPrice(product?.special_price)}đ
                    </span>

                    <span className="item-price__old">
                        {formatPrice(product?.retail_price)}đ
                    </span>
                </div>
            </div>
        </div>
    );
}

export default OrgProductItem;