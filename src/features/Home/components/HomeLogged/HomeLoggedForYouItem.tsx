import React from "react";
import { useHistory } from "react-router-dom";
import icon from "../../../../constants/icon";
import formatPrice from "../../../../utils/formatPrice";
import slugify from "../../../../utils/formatUrlString";
import scrollTop from "../../../../utils/scrollTop";
export default function HomeLoggedForYouItem(props: any) {
  const { products } = props;
  const history = useHistory();
  const goDetail = () => {
    scrollTop();
    history.push({
      pathname: `/san-pham/${slugify(products?.product_name)}`,
      search: `${1},${products.id},${1}`,
    });
  };
  return (
    <div className="homelogged-product__item">
      <div className="item-img" onClick={goDetail}>
        <img
          src={"https://picsum.photos/650/976?random=" + products.id}
          alt=""
        />
      </div>
      <div className="item-content" onClick={goDetail}>
        <span className="item-content__title">{products.product_name}</span>
        <div className="item-content__info">
          <span className="item-content__info-name">{}</span>
          <div className="price-rate__wrap">
            <div className="price">
              <span>{formatPrice(products.retail_price)}</span>
              <span>
                {formatPrice(products.origin_price)}
                <u>đ</u>
              </span>
            </div>
            <div className="rate">
              <span>4.5</span>
              <img src={icon.star} alt="" />
            </div>
          </div>
          <div className="dead-line">
            <span>HSD:</span>
            <span>17 - 9 - 2021</span>
          </div>
        </div>
      </div>
    </div>
  );
}
