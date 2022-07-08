/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import icon from "../../constants/icon";
import Head from "../Head";
import HeadMobile from "../HeadMobile";
import HeadTitle from "../HeadTitle";
import useFullScreen from "../../utils/useFullScreen";
import { Container } from "@mui/material";
import UserPaymentInfo from "../Account/components/UserPaymentInfo";
import CartGroupItem from "./components/CartGroupItem";
import CartBottom from "./components/CartBottom";
import Footer from "../Footer";
import { clearByCheck, getTotal } from "../../redux/cartSlice";
import CartPaymentMethod from "./components/CartPaymentMethod";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../../rootComponents/flatForm";
import PaymentMethodCpn from "../PaymentMethod";
import { extraPaymentMethodId } from "../PaymentMethod/extraPaymentMethodId";
import CartNull from "../Cart/components/CartNull";
import { AppContext } from "../../context/AppProvider";

function Carts() {
    const { t } = useContext(AppContext);
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const dispatch = useDispatch();
    const { cartList, cartAmountDiscount, cartAmount } = useSelector(
        (state: any) => state.carts
    );
    const org = cartList.filter((item: any) => item.isConfirm === true)[0]?.org;

    const cartConfirm = cartList.filter((item: any) => item.isConfirm === true);

    const intersection = cartList.filter((x: any) => !cartConfirm.includes(x));

    const handleClearByCheck = () => {
        if (cartConfirm.length > 0) {
            const action = intersection;
            dispatch(clearByCheck(action));
        }
    };

    useEffect(() => {
        dispatch(getTotal());
    }, [dispatch, cartList]);

    const [open, setOpen] = useState(false);
    const [pmtMethod, setPmtMethod] = useState<any>();
    const [address, setAddress] = useState<any>();

    const DATA_CART = { cartList, cartAmountDiscount, cartAmount };
    const orgs_id = cartList.map((item: any) => item.org_id);
    const IS_MB = useFullScreen();
    function unique(arr: any) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
    const orgs = unique(orgs_id);
    const cartListGroupOrg = orgs.map((item) => {
        const cartItemByOrg = cartList.filter((i: any) => item === i.org_id);
        return {
            org_id: item,
            org_name: cartItemByOrg[0]?.org_name,
            items: cartItemByOrg,
        };
    });

    const { payments_method } = useSelector(
        (state: any) => state.PAYMENT.PAYMENT
    );
    const payment_method_id = extraPaymentMethodId(
        payments_method,
        setPmtMethod
    );
    const DATA_PMT = { pmtMethod, address, payment_method_id, org };
    return (
        <>
            <HeadTitle title={`${t("pm.cart")}`} />
            {IS_MB ? (
                <HeadMobile
                    title={`${t("pm.cart")}`}
                    element={
                        <CartHeadRight
                            length={cartConfirm.length}
                            handleClearByCheck={handleClearByCheck}
                        />
                    }
                />
            ) : (
                <Head />
            )}
            {cartList?.length === 0 || !cartList ? (
                <CartNull />
            ) : (
                <>
                    <Container>
                        <div className="re-cart-cnt">
                            <div className="re-cart-cnt__head">
                                <UserPaymentInfo
                                    onSetAddressDefault={setAddress}
                                />
                            </div>
                            {FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX && (
                                <div
                                    onClick={() => setOpen(true)}
                                    className="re-cart-cnt__pmt"
                                >
                                    <span>{`${t("pm.payment_method")}`}</span>
                                    <br />
                                    <span>
                                        {pmtMethod
                                            ? pmtMethod?.name_key
                                            : `${t("pm.choose_pm")}`}
                                    </span>
                                </div>
                            )}
                            <div className="re-cart-cnt__body">
                                <ul className="re-cart-cnt__body-list">
                                    {cartListGroupOrg.map(
                                        (item: any, index: number) => (
                                            <li
                                                key={index}
                                                className="re-cart-cnt__body__item"
                                            >
                                                <CartGroupItem
                                                    item={item}
                                                    org={org}
                                                    cartList={cartList}
                                                />
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </Container>
                    <CartPaymentMethod
                        open={open}
                        setOpen={setOpen}
                        pmtMethod={pmtMethod}
                        setPmtMethod={setPmtMethod}
                    />
                    <div style={{ display: "none" }}>
                        <PaymentMethodCpn
                            e={pmtMethod}
                            onPaymentMethodChange={setPmtMethod}
                        />
                    </div>
                    <CartBottom DATA_CART={DATA_CART} DATA_PMT={DATA_PMT} />
                </>
            )}
            <Footer />
        </>
    );
}

export default Carts;

const CartHeadRight = (props: any) => {
    const { length, handleClearByCheck } = props;
    return (
        <div
            onClick={handleClearByCheck}
            className="flex-row re-cart-head-right"
        >
            <span>Xóa({length})</span>
            <img src={icon.TrashOrange} alt="" />
        </div>
    );
};
