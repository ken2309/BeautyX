import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import icon from "../../../constants/icon";
import { IProductPromo } from "../../../interface/productPromo";
import { onSetStatusProduct } from "../../../redux/org_products/productSlice";
import { onToggleSearchCnt } from "../../../redux/search/searchSlice";
import onErrorImg from "../../../utils/errorImg";
import { formatDistance } from "../../../utils/format";
import formatPrice from "../../../utils/formatPrice";
import scrollTop from "../../../utils/scrollTop";
import { formatRouterLinkProductPromo } from "../../../utils/formatRouterLink/formatRouter";
import { AUTH_LOCATION } from "../../../api/authLocation";
// ==== api tracking ====
//  import tracking, {COMPONENT_NAME} from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
// end
interface IProps {
    product: IProductPromo;
    keyword: String;
}

function ProductResultItem(props: IProps) {
    const { product, keyword } = props;
    const dispatch = useDispatch();
    const distance = formatDistance(product?._geoDistance);
    const onItemClick = () => {
        scrollTop();
        const result = {
            store_id: product.org_id,
            product_id: product.id,
        };
        // tracking.SEARCH_RESULT_ITEM_CLICK(
        //     keyword,
        //     result,
        //     COMPONENT_NAME.PRODUCT,
        //     AUTH_LOCATION
        // );
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        dispatch(onToggleSearchCnt(false));
        dispatch(onSetStatusProduct("LOADING"));
    };
    const pathProductOb = formatRouterLinkProductPromo(product);

    return (
        <Link
            to={pathProductOb}
            className="service-result-item"
            onClick={onItemClick}
        >
            <img
                className="service-result-item__img"
                src={product?.image_url || product?.org_image}
                alt=""
                onError={(e) => onErrorImg(e)}
            />
            <div className="service-result-item__detail">
                <span className="name">{product?.product_name}</span>
                <div className="flex-row price">
                    {product?.special_price > 0 ? (
                        <>
                            <span>{formatPrice(product?.special_price)}đ</span>
                            <span>{formatPrice(product?.retail_price)}đ</span>
                        </>
                    ) : (
                        <span>{formatPrice(product?.retail_price)}đ</span>
                    )}
                </div>
                <div className="flex-row-sp bottom">
                    <div className="flex-row bottom-left">
                        <img
                            src={product?.org_image}
                            onError={(e) => onErrorImg(e)}
                            alt=""
                        />
                        <span>{product?.org_name}</span>
                    </div>
                    <div className="flex-row bottom-right">
                        <div className="flex-row bottom-right__item">
                            <img src={icon.star} alt="" className="item-icon" />
                            <span>{product?.rating} (987+)</span>
                        </div>
                        {product?._geoDistance && (
                            <div
                                style={{ marginLeft: "18px" }}
                                className="flex-row bottom-right__item"
                            >
                                <img
                                    src={icon.mapPinRed}
                                    alt=""
                                    className="item-icon"
                                />
                                <span>{distance}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductResultItem;
