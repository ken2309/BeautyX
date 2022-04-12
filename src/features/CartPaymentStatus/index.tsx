import React, { useState, useEffect, useRef } from 'react';
import HeadTitle from '../HeadTitle';
import Head from '../Head';
import './cart-status.css';
import { Container, CircularProgress } from '@mui/material';
import useCountDown from '../../utils/useCountDown';
import { useLocation, useHistory } from 'react-router-dom';
import paymentGatewayApi from '../../api/paymentGatewayApi';
import { useSelector } from 'react-redux';
import formatPrice from '../../utils/formatPrice'


function CartPaymentStatus() {
    const sec = useCountDown(600);
    const [dataStatus, setDataStatus] = useState<boolean>(false);
    const carts = useSelector((state: any) => state.carts);
    const list = carts.cartList.filter((item: any) => item.isConfirm === true);
    const services = list.filter((item: any) => item.is_type === 2);
    const location = useLocation();
    const history = useHistory();
    const res: any = location?.state;
    console.log(res)
    const intervalRef = useRef<any>();
    const deep_link = res.payment_gateway.extra_data.deeplink;
    const transaction_uuid = res?.payment_gateway?.transaction_uuid;
    console.log(transaction_uuid)
    console.log(deep_link)
    // const handleOpenAppByDeepLink = () => {
    //     if (deep_link) {
    //         const newWindow = window.open(`${deep_link}`, '_blank', 'noopener,noreferrer')
    //         if (newWindow) newWindow.opener = null
    //     }
    // }
    async function handleGetPaymentStatus() {
        try {
            const res_status = await paymentGatewayApi.getStatus({
                paymentId: transaction_uuid,
            })
            const status = res_status.data.context.status;
            console.log(status)
            switch (status) {
                case "PAID":
                    return setDataStatus(true);
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }
    const timerRender = [0];
    const setInter = () => {
        timerRender[0] = 150;
        intervalRef.current = setInterval(() => {
            // console.log(timerRender[0]);
            if (timerRender[0] > 0) {
                timerRender[0] -= 1;
                // (status === true)?getStatus(true):getStatus()
                handleGetPaymentStatus();
            } else {
                return clearInterval(intervalRef.current);
            }
        }, 4000);
    };
    useEffect(() => {
        if (transaction_uuid) {
            setInter();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transaction_uuid]);



    return (
        <>
            <HeadTitle
                title={dataStatus === true ? 'Thanh toán thành công' : 'Thanh toán đơn hàng'}
            />
            <Head />
            <Container>
                <div
                    className='pm-st-cnt'
                >
                    <div className="pm-st-cnt__body">
                        <span className="title">
                            Thông tin đơn hàng
                        </span>
                        <div className="body-item">
                            <span className="body-item__title">
                                Nhà cung cấp
                            </span>
                            <span className="body-item__text">
                                Công ty cổ phần MYSPA
                            </span>
                        </div>
                        <div className="body-item">
                            <span className="body-item__title">
                                Mô tả
                            </span>
                            <span className="body-item__text">
                                Thanh toán đơn hàng
                            </span>
                        </div>
                        <div className="body-item">
                            <span className="body-item__title">
                                Số tiền
                            </span>
                            <span className="body-item__text">
                                {formatPrice(res?.payment_gateway?.amount)}đ
                            </span>
                        </div>
                        {
                            dataStatus === false ?
                                <div className="pm-st-cnt__body-status">
                                    {
                                        sec <= 0 ?
                                            <span>Đơn hàng đã hết hạn</span>
                                            :
                                            <>
                                                <span className="st-title">
                                                    Đang chờ thanh toán
                                                </span>
                                                <div className="st-process">
                                                    <CircularProgress />
                                                </div>
                                                <div className="st-time-out">
                                                    <span>Đơn hàng sẽ hết hạn sau : </span>
                                                    <span>
                                                        {`0${Math.floor(sec / 60)}`.slice(-2)}:
                                                        {`0${sec - Math.floor(sec / 60) * 60}`.slice(-2)}
                                                    </span>
                                                </div>
                                            </>
                                    }
                                </div>
                                :
                                <>
                                    <div className="st-time__success">
                                        <span className='st-time__success-title'>
                                            Thanh toán thành công
                                        </span>
                                        <div className="control">
                                            {
                                                services.length > 0 &&
                                                <button
                                                    onClick={() => history.push('/goi-dich-vu')}
                                                >
                                                    Đặt hẹn ngay
                                                </button>
                                            }
                                            <button
                                                onClick={() => history.push('/Home')}
                                            >
                                                Về trang chủ
                                            </button>
                                        </div>
                                    </div>
                                </>
                        }
                        {/* <button
                            onClick={handleOpenAppByDeepLink}
                        >
                            Mở ví MOMO
                        </button> */}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default CartPaymentStatus;