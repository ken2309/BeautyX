import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { getTotal, clearByCheck } from "../../../redux/cartSlice";
import ButtonCus from "../../../components/ButtonCus/index";
import { useSelector, useDispatch } from "react-redux";
import formatPrice from "../../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import CartPopupNoti from "./CartPopupNoti";
import scrollTop from "../../../utils/scrollTop";
import CartPopupNotiSign from "./CartPopupNotiSign";
import { AppContext } from "../../../context/AppProvider";

function CartBottom(props: any) {
  const { orgs, chooseOrg, chooseOrgClick } = props;
  const { t } = useContext(AppContext);
  const USER = useSelector((state: any) => state.USER.USER)
  const dispatch = useDispatch();
  const history = useHistory();
  const [popUp, setPopUp] = useState(false);
  const [popupSign, setPopupSign] = useState(false);
  const carts = useSelector((state: any) => state.carts);
  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, carts]);
  const cartConfirm = carts.cartList.filter(
    (item: any) => item.isConfirm === true
  );

  const intersection = carts.cartList.filter(
    (x: any) => !cartConfirm.includes(x)
  );

  const firstItem = cartConfirm[0];
  const cartFirstList = cartConfirm.filter(
    (item: any) => item.org_id === firstItem.org_id
  );
  const gotoPayment = () => {
    if (USER) {
      if (carts.cartAmount > 0 && cartFirstList.length === cartConfirm.length) {
        scrollTop();
        history.push("/payment");
      } else {
        setPopUp(true);
      }
    } else {
      setPopupSign(true);
    }
  };
  const handleClearByCheck = () => {
    scrollTop();
    if (cartConfirm.length > 0) {
      const action = intersection;
      dispatch(clearByCheck(action));
    }
  };
  return (
    <div className="cart-bottom">
      <Container>
        <div className="flex-row-sp cart-bottom__content">
          <div className="cart-bottom__deleteAll">
            <ButtonCus
              text={`Xóa ${cartConfirm.length} items`}
              fontSize="14px"
              lineHeight="20px"
              color="var(--bgWhite)"
              border="solid 1px var(--purple)"
              borderRadius="18px"
              onClick={handleClearByCheck}
              backColor="var(--purple)"
              padding="8px 24px"
            />
          </div>
          <div className="flex-row-sp cart-bottom__box">
            <div className="flex-row">
              <span>
                {t("cart.total_payment")} ({carts.cartQuantity}{" "}
                {t("Mer_de.services")}/{t("Mer_de.products")})
              </span>
              <span>{formatPrice(carts.cartAmount - carts.cartAmountDiscount)} đ</span>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <ButtonCus
                text={t("cart.payment_now")}
                fontSize="14px"
                lineHeight="20px"
                color="var(--bgWhite)"
                border="solid 1px var(--purple)"
                borderRadius="18px"
                onClick={gotoPayment}
                backColor="var(--purple)"
                padding="8px 24px"
              />
            </div>
          </div>
        </div>
      </Container>
      <CartPopupNoti
        popUp={popUp}
        setPopUp={setPopUp}
        orgs={orgs}
        chooseOrg={chooseOrg}
        chooseOrgClick={chooseOrgClick}
      />
      <CartPopupNotiSign
        popupSign={popupSign}
        setPopupSign={setPopupSign}
      />
    </div>
  );
}

export default CartBottom;
