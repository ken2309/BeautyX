import React, { useContext, useState } from "react";
import { Container } from "@mui/material";
import formatPrice from "../../../utils/formatPrice";
import PopupSuccess from "../../PopupSuccess/index";
import { AppContext } from "../../../context/AppProvider";
import order from '../../../api/orderApi';
import { useHistory } from 'react-router-dom';
import ButtonLoading from "../../../components/ButtonLoading";
import { pickBy, identity } from 'lodash'
import { useSelector } from "react-redux";
import REDUCER_CART from "../../../utils/reducerCart";

const useInPayment: boolean = true;
function PaymentTotal(props: any) {
  const { t } = useContext(AppContext);
  const USER = useSelector((state: any) => state.USER.USER);
  const {
    methodList,
    value,
    chooseE_wall,
    data_cart,
  } = props;
  const history = useHistory();
  const pmMethod = methodList.find((item: any) => item.method === value);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const org_id = data_cart.list[0].org_id;

  const { products, services, combos } = REDUCER_CART(data_cart);
  const params_string = {
    products: products,
    services: services,
    treatment_combo: combos,
    payment_method_id: chooseE_wall?.id,
    coupon_code: [],
    user_address_id: data_cart.address?.id,
    description: data_cart.note,
    branch_id: data_cart.chooseBr?.id
  }
  async function handlePostOrder(org_id: number, params: object) {
    setLoading(true)
    try {
      const response = await order.postOrder(org_id, params);
      const state_payment = await response.data.context
      const desc = await state_payment.payment_gateway.description;
      const transaction_uuid = state_payment.payment_gateway.transaction_uuid;
      history.push({
        pathname: `/trang-thai-don-hang/${desc}`,
        search: transaction_uuid,
        state: state_payment
      })
      setLoading(false);
    } catch (err) {
      console.log(err)
      setLoading(false);
    }
  }
  const handleSubmitPayment = () => {
    if (USER) {
      if (data_cart.address && value && chooseE_wall?.id === 1) {
        const params = pickBy(params_string, identity);
        handlePostOrder(org_id, params)
      } else {
        console.log("Trang web chỉ chấp nhận thanh toán qua ví điện tử Momo");
      }
    }
  };
  return (
    <div className="payment-total">
      <Container>
        <div className="flex-row payment-total__head">
          <span>{t("pr.enter_sale_code")}</span>
          <input type="text" placeholder={t("pr.enter_sale_code")} />
        </div>
        <div className="flex-row payment-total__body">
          <div className="payment-total__body-item">
            <p>{t("pm.payment_method")}</p>
            <p>{t("pr.total")}</p>
            <p>{t("pm.discounts")}</p>
            <p>{t("pm.payment_total")}</p>
          </div>
          <div className="payment-total__body-item">
            <p style={{ color: "var(--text-black)" }}>
              {pmMethod
                ? `${pmMethod?.title}: ${chooseE_wall?.name_key}`
                : t("pm.choose_payment_method")}
            </p>
            <p>{formatPrice(data_cart.carts.cartAmount)} đ</p>
            <p>0 đ</p>
            <p>{formatPrice(data_cart.carts.cartAmount)} đ</p>
          </div>
        </div>
        <div className="flex-row-sp payment-total__body-submit">
          <span>{t("pm.enter_to_payment")}</span>
          <ButtonLoading
            title={t("pm.payment_2")}
            loading={loading}
            onClick={handleSubmitPayment}
          />
        </div>
      </Container>
      <PopupSuccess
        popup={popup}
        setPopup={setPopup}
        useInPayment={useInPayment}
        title={t("pm.payment_success")}
      />
    </div>
  );
}

export default PaymentTotal;
