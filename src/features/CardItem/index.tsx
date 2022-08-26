import React from "react";
import "./cardItem.css";
import icon from "../../constants/icon";
import formatPrice from "../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import scrollTop from "../../utils/scrollTop";
import slugify from "../../utils/formatUrlString";
import onErrorImg from "../../utils/errorImg";
// ==== api tracking ====
 import tracking from "../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../utils/dataLayer";
// end

//note: product : is_type = 1, service: is_type = 2
function CardItem(props: any) {
    const { detail, style, name, retail_price, special_price, org, is_type } =
        props;
    const history = useHistory();
    const discount = 100 - (special_price / retail_price) * 100;
    const gotoDetail = () => {
        scrollTop();
        tracking.USER_ITEM_CLICK(org.id,detail.id)
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        if (is_type === 1) {
            history.push({
                pathname: `/span-pham/${slugify(name)}`,
                search: `${org.id},${detail.id},${is_type}`,
                state: { org, detail, name },
            });
        } else if (is_type === 2) {
            history.push({
                pathname: `/dich-vu/${slugify(name)}`,
                search: `${org.id},${detail.id},${is_type}`,
                state: { org, detail, name },
            });
        }
    };
    return (
        <li onClick={gotoDetail} className="card">
            <div
                style={special_price < 0 ? { display: "none" } : {}}
                className="card-discount"
            >
                Giảm {discount.toFixed()}%
            </div>
            <img
                src={`${detail.image ? detail?.image_url : org?.image_url}`}
                alt=""
                onError={(e) => onErrorImg(e)}
                className="card-img"
            />
            <div className="card-info">
                <div className="card-name">{name}</div>
                <div className="flex-row-sp card-price">
                    <span className="flex-row card-price__detail">
                        <h4
                            style={
                                special_price < 0
                                    ? {
                                          textDecoration: "none",
                                          fontSize: "16px",
                                          lineHeight: "24px",
                                          fontWeight: "bold",
                                          color: "var(--purple)",
                                      }
                                    : {}
                            }
                        >
                            {formatPrice(retail_price)} đ
                        </h4>
                        <h3
                            style={special_price < 0 ? { display: "none" } : {}}
                        >
                            {formatPrice(special_price)} đ
                        </h3>
                    </span>
                    <span className="flex-row card-price__star">
                        4.5
                        <img src={icon.star} alt="" />
                    </span>
                </div>
                <div className="flex-row">
                    <img src={icon.mapPinRed} alt="" />
                    <span className="card-spa-name">{org?.address}</span>
                </div>
                <span
                    style={special_price < 0 ? { display: "none" } : {}}
                    className="card-date"
                >
                    HSD: 20-01-2022
                </span>
            </div>
            {/* <button onClick={handleAddCart} >Add cart</button> */}
        </li>
    );
}

export default CardItem;
