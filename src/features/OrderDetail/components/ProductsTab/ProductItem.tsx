import React, { useEffect, useState, useContext } from "react";
import productsApi from "../../../../api/productApi";
import { Product } from "../../../../interface/product";
import formatPrice from "../../../../utils/formatPrice";
import ButtonCus from "../../../../components/ButtonCus";
import { addCart } from "../../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import slugify from "../../../../utils/formatUrlString";
import { AppContext } from "../../../../context/AppProvider";
import scrollTop from "../../../../utils/scrollTop";
import onErrorImg from "../../../../utils/errorImg";

function ProductItem(props: any) {
  const { productItem, org, open } = props;
  const { t } = useContext(AppContext);
  const [product, setProduct] = useState<Product>();
  const history = useHistory();
  const dispatch = useDispatch();
  // go to detail product
  const is_type = 1;
  const detail = product;
  const name = product?.product_name;
  const handleDetailProduct = () => {
    scrollTop();
    history.push({
      pathname: `/product-detail/${slugify(product?.product_name)}`,
      search: `${org?.id},${productItem?.productable_id},${is_type}`,
      state: { org, detail, name },
    });
  };
  // add cart
  const values = {
    id: product?.id,
    org_id: org.id,
    org_name: org.name,
    cart_id: parseInt(`${is_type}${org.id}${product?.id}`), //is_type + org_id + id
    name: product?.product_name,
    quantity: 1,
    is_type: is_type,
    isConfirm: true,
    price: product?.retail_price,
  };
  const handleAddCart = () => {
    scrollTop();
    const action = addCart(values);
    history.push({
      pathname: `/cart`,
    });
    dispatch(action);
  };

  useEffect(() => {
    async function handleGetPrDetail() {
      try {
        const res = await productsApi.getDetailById({
          org_id: org.id,
          id: productItem.productable_id,
        });
        setProduct(res.data.context);
      } catch (error) {
        console.log(error);
      }
    }
    if (open === true) {
      handleGetPrDetail();
    }
  }, [org.id, productItem.productable_id, open]);
  return (
    <li>
      <div className="order-de-list__item">
        <img
          src={product?.image_url ? product?.image_url : org.image_url }
          onError={(e)=>onErrorImg(e)}
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
                padding="4px 8px"
                color="var(--purple)"
                backColor="var(--bgGray)"
                borderRadius="12px"
                margin="0px 16px 0px 0px"
              />
              <ButtonCus
                onClick={handleAddCart}
                text="Pre-Order"
                padding="4px 8px"
                color="var(--bgWhite)"
                backColor="var(--purple)"
                borderRadius="12px"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
