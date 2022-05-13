import React, { useContext } from "react";
import SectionTitle from "../../SectionTitle";
import icon from "../../../constants/icon";
import CartItem from "../../Cart/components/CartItem";
import { AppContext } from "../../../context/AppProvider";
import { Cart } from '../../../interface/cart'

function PaymentCart(props: any) {
  const { t } = useContext(AppContext);
  const inPayment: boolean = true;
  const { data_cart } = props;
  const org_name = data_cart.list[0].org_name;
  return (
    <div className="cart-list cart-list__payment">
      <SectionTitle title={org_name} />
      {
        data_cart.services.length > 0 &&
        <span className="flex-row cart-list-item__head">
          <img src={icon.box} alt="" />
          {t("Mer_de.services")}
        </span>
      }
      <div className="flex-row cart-list-item__title">
        <span>{t("Mer_de.services_name")}</span>
        <div className="wrap-services_name">
          <span>{t("pr.quantity")}</span>
          <span>{t("cart.unit_price")}</span>
          <span>{t("pr.total")}</span>
        </div>
      </div>
      <ul className="flex-column">
        {data_cart.services.map((child: Cart) => (
          <CartItem
            inPayment={inPayment}
            key={child.cart_id}
            cartItem={child}
          />
        ))}
      </ul>
      {
        data_cart.products.length > 0 &&
        <>
          <span className="flex-row cart-list-item__head">
            <img src={icon.bag} alt="" />
            {t("Mer_de.products")}
          </span>
          <ul className="flex-column">
            {data_cart.products.map((child: Cart) => (
              <CartItem
                key={child.cart_id}
                cartItem={child}
                inPayment={inPayment}
              />
            ))}
          </ul>
        </>
      }
      {
        data_cart.combos.length > 0 &&
        <>
          <span className="flex-row cart-list-item__head">
            <img src={icon.bag} alt="" />
            Combo
          </span>
          <ul className="flex-column">
            {data_cart.combos.map((child: Cart) => (
              <CartItem
                key={child.cart_id}
                cartItem={child}
                inPayment={inPayment}
              />
            ))}
          </ul>
        </>
      }
    </div>
  );
}

export default PaymentCart;
