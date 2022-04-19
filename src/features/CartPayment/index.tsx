import React, { useContext, useEffect, useState } from "react";
import Head from "../Head/index";
import "./cartPayment.css";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PaymentForm from "./components/PaymentForm";
import PaymentCart from "./components/PaymentCart";
import PaymentMethod from "./components/PaymentMethod";
import PaymentTotal from "./components/PaymentTotal";
import Footer from "../Footer/index";
import img from "../../constants/img";
import { getTotal } from "../../redux/cartSlice";
import { AppContext } from "../../context/AppProvider";
import payments from "../../api/paymentApi";
import { IUserAddress } from '../../interface/userAddress';
import userAddressApi from "../../api/userAddressApi";

const isCart: boolean = true;
function CartPayment(props: any) {
  const { t, profile } = useContext(AppContext);
  //const history = useHistory();
  const headerTitle = t("pm.payment");
  const [value, setValue] = React.useState("");
  const [paymentMethodOnl, setPaymentMethodOnl] = useState();
  const [note, setNote] = useState('')
  const [chooseE_wall, setChooseE_wall] = useState();
  const [address, setAddress] = useState<IUserAddress>()
  const dispatch = useDispatch();
  const carts = useSelector((state: any) => state.carts);
  const list = carts.cartList.filter((item: any) => item.isConfirm === true);
  const products = list.filter((item: any) => item.is_type === 1);
  const services = list.filter((item: any) => item.is_type === 2);
  const combos = list.filter((item: any) => item.is_type === 3);
  const [chooseBr, setChooseBr] = useState();
  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, carts]);
  // useEffect(() => {
  //   const userPayment = JSON.parse(
  //     `${localStorage.getItem("user-payment-wb")}`
  //   );
  //   if (userPayment) {
  //     setUserInfo(userPayment);
  //   }
  // }, []);
  useEffect(() => {
    async function handleGetPaymentMethod() {
      try {
        const res = await payments.getAllPayment();
        setPaymentMethodOnl(res.data.context.data);
      } catch (err) {
        console.log(err);
      }
    }
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
    handleGetPaymentMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const PAYMENT_METHOD = [
    // {
    //   id: 1,
    //   img: img.money,
    //   title: "Thanh toán tại cơ sở",
    //   method: "PAYMENT_IN_BRANCH",
    //   method_list: [],
    // },
    // {
    //   id: 2,
    //   img: img.cardAtm,
    //   title: "Thanh toán bằng thẻ ATM và tài khoản ngân hàng",
    //   method: "PAYMENT_ATM",
    //   method_list: [],
    // },
    {
      id: 3,
      img: img.cardAtm,
      title: "Thanh toán qua ví điện tử",
      method: "CARD_ONLINE",
      method_list: paymentMethodOnl,
    },
    // { id: 4, img: img.creditMachine, title: 'Thanh toán bằng thẻ quốc tế Visa/Master/JCB', method: 'PAYMENT_VISA', method_list:[] },
    // { id: 6, img: img.imagePay, title: 'Thanh toán qua Ví Ngân Lượng', method: 'PAYMENT_CL', method_list:[] },
  ];
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
          <PaymentMethod
            methodList={PAYMENT_METHOD}
            value={value}
            setValue={setValue}
            chooseE_wall={chooseE_wall}
            setChooseE_wall={setChooseE_wall}
          />
        </div>
      </Container>
      <PaymentTotal
        value={value}
        methodList={PAYMENT_METHOD}
        carts={carts}
        profile={profile}
        chooseE_wall={chooseE_wall}
        data_cart={data_cart}
      />
      <Footer />
    </div>
  );
}

export default CartPayment;
