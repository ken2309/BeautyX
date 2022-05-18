import React, { useState, useEffect, useRef } from 'react';
import HeadTitle from '../HeadTitle';
import Head from '../Head';
import './cart-status.css';
import { Container } from '@mui/material';
import useCountDown from '../../utils/useCountDown';
import { useLocation } from 'react-router-dom';
import paymentGatewayApi from '../../api/paymentGatewayApi';
import { useSelector} from 'react-redux';
import PaymentQr from './components/PaymentQr';
import PaymentInfo from './components/PaymentInfo';
import PaymentConfirm from './components/PaymentConfirm';

const timerRender = [0];
const ORDER_STATUS = ['PENDING', 'PAID', 'CANCELED_BY_USER']

function CartPaymentStatus() {
    const sec = useCountDown(600);
    const [orderStatus, setOrderStatus] = useState(ORDER_STATUS[0])
    const [openConf, setOpenConf] = useState(false);
    const carts = useSelector((state: any) => state.carts);
    const list = carts.cartList.filter((item: any) => item.isConfirm === true);
    const services = list.filter((item: any) => item.is_type === 2);
    const location = useLocation();
    const res: any = location?.state;
    const intervalRef = useRef<any>();
    const pay_url = res.payment_gateway.extra_data.payUrl
    


    const transaction_uuid = res?.payment_gateway?.transaction_uuid;

    window.onbeforeunload = function () {
        return 'Are you sure you want to leave?';
    };

    const handleGetPaymentStatus = async (_status: boolean) => {
        try {
            const res_status = await paymentGatewayApi.getStatus({
                paymentId: transaction_uuid,
                status: _status
            })
            const status = res_status.data.context.status;
            switch (status) {
                case "PAID":
                    setOrderStatus(status)
                    timerRender[0] = -1;
                    break;
                case "PENDING":
                    setOrderStatus(status)
                    break;
                case "CANCELED_BY_USER":
                    setOrderStatus(status)
                    timerRender[0] = -1;
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }
    const dataCartInfo = { res, orderStatus, sec, services }
    const setInter = () => {
        timerRender[0] = 150;
        intervalRef.current = setInterval(() => {
            if (timerRender[0] > 0) {
                timerRender[0] -= 1;
                handleGetPaymentStatus(false);
            } else {
                return clearInterval(intervalRef.current);
            }
        }, 5000);
    };
    useEffect(() => {
        if (transaction_uuid) {
            setInter();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleCancelPayment = () => {
        handleGetPaymentStatus(true)
        timerRender[0] = -1
    }
    const handleCancelOrder = () => {
        //handleCancelPayment()
        setOpenConf(true)
    }
    useEffect(() => {
        if (sec === 0) {
            handleCancelPayment()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sec])
    return (
        <>
            <HeadTitle
                title={orderStatus === "PAID" ? 'Thanh toán thành công' : 'Thanh toán đơn hàng'}
            />
            <Head/>
            <Container>
                <div
                    className='pm-st-cnt'
                >
                    <PaymentQr
                        res={res}
                        orderStatus={orderStatus}
                        pay_url={pay_url}
                    />
                    <div className="pm-st-cnt__body">
                        <PaymentInfo
                            data={dataCartInfo}
                            handleCancelOrder={handleCancelOrder}
                        />
                    </div>
                </div>
            </Container>
            <PaymentConfirm
                open={openConf}
                setOpen={setOpenConf}
                handleCancelPayment={handleCancelPayment}
            />
        </>
    );
}

export default CartPaymentStatus;