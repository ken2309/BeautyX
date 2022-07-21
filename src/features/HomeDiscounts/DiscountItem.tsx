import React from "react";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../interface/discount";
import onErrorImg from "../../utils/errorImg";
import formatPrice from "../../utils/formatPrice";
import icon from "../../constants/icon";
import { useHistory } from "react-router-dom";
import { formatRouterLinkDiscount } from "../../utils/formatRouterLink/formatRouter";
// ==== api tracking ====
//  import tracking,{COMPONENT_NAME} from "../../api/trackApi";
// end
interface IProps {
    discountPar: IDiscountPar;
    discountItem: IITEMS_DISCOUNT;
}

function DiscountItem(props: IProps) {
    const { discountPar, discountItem } = props;
    const pathDiscountOb = formatRouterLinkDiscount(discountPar, discountItem);
    const history = useHistory();
    const onDetail = () => {
        // tracking.DISCOOUNT_ITEM_CLICK(
        //     discountItem.organization.id,
        //     COMPONENT_NAME.HOT_DEAL,
        //     discountItem.discount_id
        // );
        history.push(pathDiscountOb);
    };
    return (
        <div onClick={onDetail} className="home-discount-item__cnt">
            <img
                className="home-discount-item__img"
                src={
                    discountItem.productable.image
                        ? discountItem.productable.image_url
                        : discountItem.organization.image_url
                }
                alt=""
                onError={(e) => onErrorImg(e)}
            />
            <div className="home-discount-item__detail">
                <span className="name">
                    {discountItem.productable.service_name}
                </span>
                <div className="flex-row price">
                    <span className="sale-price">
                        {formatPrice(discountItem.view_price)}đ
                    </span>
                    <span className="old-price">
                        {formatPrice(discountItem.productable.price)}đ
                    </span>
                </div>
                <div className="address">
                    <img src={icon.mapPinRed} alt="" />
                    <span>{discountItem.organization.full_address}</span>
                </div>
                <div className="limit-bar">
                    <div
                        style={
                            !discountPar.total ||
                            discountPar.total === discountPar.used
                                ? { width: "100%" }
                                : {
                                      width: `${
                                          (discountPar.used /
                                              discountPar.total) *
                                          100
                                      }%`,
                                  }
                        }
                        className="limit-bar__used"
                    ></div>
                    <span className="limit-bar__num">
                        {discountPar?.total
                            ? `Đã bán ${discountPar.used}/${discountPar.total}`
                            : "Đang mở"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DiscountItem;
