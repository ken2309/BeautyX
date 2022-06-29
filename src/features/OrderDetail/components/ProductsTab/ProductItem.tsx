import React, { useContext } from "react";
import formatPrice from "../../../../utils/formatPrice";
import ButtonCus from "../../../../components/ButtonCus";
import { addCart, onClearPrevCartItem } from "../../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import slugify from "../../../../utils/formatUrlString";
import { AppContext } from "../../../../context/AppProvider";
import scrollTop from "../../../../utils/scrollTop";
import onErrorImg from "../../../../utils/errorImg";
import { formatAddCart } from "../../../../utils/cart/formatAddCart";

function ProductItem(props: any) {
  const { productItem, org } = props;
  const product = productItem.productable;
  const { t } = useContext(AppContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDetailProduct = () => {
    scrollTop();
    history.push({
      pathname: `/product-detail/${slugify(product?.product_name)}`,
      search: `id=${product?.id}&org=${org?.id}`,
    })
  };
  // add cart
  const cartValues = formatAddCart(
    product,
    org,
    1,
    1,
    product?.price,
    null,
    true
  )
  const handleAddCart = () => {
    dispatch(onClearPrevCartItem())
    dispatch(addCart(cartValues))
    history.push('/gio-hang')
  };
  return (
    <li>
      <div className="order-de-list__item">
        <img
          src={product?.image_url ? product?.image_url : org.image_url}
          onError={(e) => onErrorImg(e)}
          alt=""
          className="order-de-pr-item__img"
        />
        <div className="order-de-pr-item__cnt">
          <div className="item-detail">
            <span className="flex-row-sp item-name">
              {product?.product_name}
              <span> x{productItem.quantity}</span>
            </span>
            <span className="item-org__name">{org.name}</span>
          </div>
          <div className="flex-row-sp item-bottom">
            <span className="price">{formatPrice(product?.retail_price)}đ</span>
            <div className="flex-row item-button">
              <ButtonCus
                onClick={handleDetailProduct}
                text={t("order.watch_info")}
              />
              <ButtonCus
                onClick={handleAddCart}
                text="Pre-Order"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
