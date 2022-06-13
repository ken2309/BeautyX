import React, { useContext, useEffect, useState } from "react";
import Head from "../Head/index";
import "./cartPayment.css";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PaymentForm from "./components/PaymentForm";
import PaymentCart from "./components/PaymentCart";
import PaymentMethodCpn from "../PaymentMethod";
import PaymentTotal from "./components/PaymentTotal";
import Footer from "../Footer/index";
import { getTotal } from "../../redux/cartSlice";
import { AppContext } from "../../context/AppProvider";
import { IUserAddress } from '../../interface/userAddress';
import userAddressApi from "../../api/userAddressApi";
import { cartReducer } from "../../utils/cart/cartReducer";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../../rootComponents/flatForm";


const isCart: boolean = true;
function CartPayment(props: any) {
  const { t } = useContext(AppContext);
  const FLAT_FORM = EXTRA_FLAT_FORM();
  const headerTitle = t("pm.payment");
  const [note, setNote] = useState('')
  const [chooseE_wall, setChooseE_wall] = useState();
  const [address, setAddress] = useState<IUserAddress>()
  const dispatch = useDispatch();
  const carts = useSelector((state: any) => state.carts);
  const list = carts.cartList.filter((item: any) => item.isConfirm === true);
  const { products, services, combos } = cartReducer(list);
  const [chooseBr, setChooseBr] = useState();
  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, carts]);

  useEffect(() => {
    async function handleGetUserAddress() {
      const session = await window.sessionStorage.getItem("_WEB_TK");
      const local = await localStorage.getItem("_WEB_TK")
      try {
        const res = await userAddressApi.getAll(session, local);
        setAddress(res?.data.context.find((item: IUserAddress) => item.is_default === true))
      } catch (error) {
        console.log(error)
      }
    }
    handleGetUserAddress()
  }, []);

  const data_cart = {
    list, products, services, combos, address, note, chooseBr, carts
  }
  return (
    <div className="payment">
      <Head isCart={isCart} title={headerTitle} />
      <Container>
        <div className="payment-cnt">
          <PaymentForm
            list={list}
            address={address}
            setNote={setNote}
            chooseBr={chooseBr}
            setChooseBr={setChooseBr}
          />
          <PaymentCart
            data_cart={data_cart}
          />
          {/* payment method for flat form beautyX */}
          <div
            style={
              (FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX) ?
                { display: "block" } : { display: "none" }
            }
          >
            <PaymentMethodCpn
              e={chooseE_wall}
              onPaymentMethodChange={setChooseE_wall}
            />
          </div>
        </div>
      </Container>
      <PaymentTotal
        carts={carts}
        chooseE_wall={chooseE_wall}
        data_cart={data_cart}
      />
      <Footer />
    </div>
  );
}

export default CartPayment;
