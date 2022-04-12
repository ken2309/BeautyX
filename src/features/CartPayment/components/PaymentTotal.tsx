import React, { useContext, useState } from "react";
import { Container } from "@mui/material";
import formatPrice from "../../../utils/formatPrice";
import ButtonCus from "../../../components/ButtonCus";
import PopupSuccess from "../../PopupSuccess/index";
import { AppContext } from "../../../context/AppProvider";
import order from '../../../api/orderApi';
import { Cart } from '../../../interface/cart';
import { useHistory } from 'react-router-dom';

const useInPayment: boolean = true;
function PaymentTotal(props: any) {
  const { t } = useContext(AppContext);
  const {
    methodList,
    value,
    profile,
    chooseE_wall,
    data_cart,
  } = props;
  const history = useHistory();
  const pmMethod = methodList.find((item: any) => item.method === value);
  const [popup, setPopup] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const org_id = data_cart.list[0].org_id;

  const productsPost = data_cart.products.map((item: Cart) => ({ id: item.id, quantity: item.quantity }))
  const servicesPost = data_cart.services.map((item: Cart) => ({ id: item.id, quantity: item.quantity }))
  const combosPost = data_cart.combos.map((item: Cart) => ({ id: item.id, quantity: item.quantity }))

  const params_string = `{
    "products":${JSON.stringify(productsPost)},
    "services":${JSON.stringify(servicesPost)},
    "treatment_combo":${JSON.stringify(combosPost)},
    "payment_method_id":${chooseE_wall?.id},
    "coupon_code":[],
    "user_address_id":${data_cart.address?.id}
    ${data_cart.note.length > 0 ? `,"description": "${data_cart.note}"` : ``}
    ${data_cart.chooseBr ? `,"branch_id":${data_cart.chooseBr.id}` : ``}
  }`

  async function handlePostOrder(org_id: number, params: object) {
    try {
      const response = await order.postOrder(org_id, params);
      const state_payment = await response.data.context
      const payUrl = await state_payment.payment_gateway.extra_data.payUrl;
      const desc = await state_payment.payment_gateway.description;
      const transaction_uuid = state_payment.payment_gateway.transaction_uuid;
      const newWindow = window.open(`${payUrl}`, '_blank', 'noopener,noreferrer')
      setDisableBtn(true)
      if (newWindow) newWindow.opener = null
      console.log(desc, transaction_uuid)
      history.push({
        pathname: `/trang-thai-don-hang/${desc}`,
        search: transaction_uuid,
        state: state_payment
      })
    } catch (err) {
      console.log(err)
      setDisableBtn(false)
    }
  }
  const handleSubmitPayment = () => {
    //console.log(JSON.parse(params_string))
    if (disableBtn === false) {
      if (profile) {
        if (data_cart.address && value && chooseE_wall?.id === 1) {
          handlePostOrder(org_id, JSON.parse(params_string))
        } else {
          console.log("Trang web chỉ chấp nhận thanh toán qua ví điện tử Momo");
        }
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
          <ButtonCus
            text={t("pm.payment_2")}
            color="var(--purple)"
            border="solid 1px var(--purple)"
            borderRadius="16px"
            onClick={handleSubmitPayment}
            opacity={disableBtn === false ? '1' : '0.4'}
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
