import React from "react";
import { useHistory } from "react-router-dom";
import icon from "../../../../constants/icon";
import formatPrice from "../../../../utils/formatPrice";
import slugify from "../../../../utils/formatUrlString";
import scrollTop from "../../../../utils/scrollTop";

export default function HomeLoggedProductItem(props: any) {
  const { product } = props;
  const history = useHistory();
  const goDetail = () => {
    scrollTop();
    history.push({
      pathname: `/san-pham/${slugify(product.product_name)}`,
      search: `${1},${product.id},${1}`,
    });
  };
  return (
    <div className="homelogged-product__item">
      <div className="item-img" onClick={goDetail}>
        <img
          src={"https://picsum.photos/650/976?random=" + product.id}
          alt=""
        />
      </div>
      <div className="item-content" onClick={goDetail}>
        <span className="item-content__title">{product.product_name}</span>
        <div className="item-content__info">
          <span className="item-content__info-name">Bay Spa & Massage</span>
          <div className="price-rate__wrap">
            <span className="price-text-purple">
              {formatPrice(product.origin_price)}
              <u>đ</u>
            </span>
            <div className="rate">
              <span>4.5</span>
              <img src={icon.star} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
