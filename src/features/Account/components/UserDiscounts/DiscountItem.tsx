import React from "react";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../../../interface/discount";
import formatDate from "../../../../utils/formatDate";
import formatPrice from "../../../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import slugify from "../../../../utils/formatUrlString";

interface IProps {
    discountPar: IDiscountPar;
    discountItem: any;
}

function DiscountItem(props: IProps) {
    const history = useHistory();
    const { discountPar, discountItem } = props;
    const org = discountItem?.organization;
    const onCheckType = () => {
        let type;
        switch (discountItem.productable_type) {
            case "App\\Models\\CI\\Service":
                type = "service";
                break;
            case "App\\Models\\CI\\Product":
                type = "product";
                break;
        }
        return type;
    };
    const type = onCheckType();
    const onDetail = () => {
        history.push({
            pathname: `/chi-tiet-giam-gia/${slugify(
                discountItem.productable.service_name ||
                    discountItem.productable.product_name
            )}`,
            search: `type=${type}&org_id=${org?.id}&dis_id=${discountPar?.id}&item_id=${discountItem.productable_id}`,
        });
    };
    return (
        <li onClick={onDetail} className="discount-item">
            <div className="img">
                <img
                    className="discount-item__img"
                    src={discountItem.productable.image_url}
                    alt=""
                />
                {discountPar.valid_util && (
                    <div className="vail_util">
                        <span>HSD:{formatDate(discountPar.valid_util)} </span>
                    </div>
                )}
            </div>
            <div className="discount-item__cnt">
                <div className="discount-item__cnt-top">
                    <span className="discount-item__cnt-title">
                        {discountPar.title}
                    </span>
                    <span className="discount-item__cnt-name">
                        {discountItem.productable.service_name}
                    </span>
                </div>
                <div className="flex-row discount-item__cnt-price">
                    <span>{formatPrice(discountItem.view_price)}</span>
                    <span>{formatPrice(discountItem.productable.price)}đ</span>
                </div>
            </div>
        </li>
    );
}

export default DiscountItem;
