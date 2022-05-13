import React from 'react';
import { CircularProgress } from '@mui/material';
import formatPrice from '../../../utils/formatPrice';
import { useHistory } from 'react-router-dom';
import '../cart-status.css'

function PaymentInfo(props: any) {
    const history = useHistory();
    const { data, handleCancelOrder } = props;
    const onCheckStatus = () => {
        switch (data.orderStatus) {
            case "PENDING":
                return <div className='flex-column pm-pending-cnt'>
                    <span className="st-title">
                        Đang chờ thanh toán
                    </span>
                    <div className="st-process">
                        <CircularProgress />
                    </div>
                    <div className="st-time-out">
                        <span>Đơn hàng sẽ hết hạn sau : </span>
                        <span>
                            {`0${Math.floor(data.sec / 60)}`.slice(-2)}:
                            {`0${data.sec - Math.floor(data.sec / 60) * 60}`.slice(-2)}
                        </span>
                    </div>
                    <button
                        className="st-pm-info__bt"
                        onClick={handleCancelOrder}
                    >
                        Hủy thanh toán
                    </button>
                </div>
            case "PAID":
                return <div className="st-time__success">
                    <span className='st-time__success-title'>
                        Thanh toán thành công
                    </span>
                    <div className="flex-row-sp control">
                        {
                            data.services.length > 0 &&
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
            case "CANCELED_BY_USER":
                return <div className='flex-column st-cancel__cnt' >
                    <span>Đã hủy thanh toán</span>
                    <button
                        onClick={() => history.push('/Home')}
                        className='st-pm-info__btn'
                    >
                        Về trang chủ
                    </button>
                </div>
            default:
                break
        }
    }
    return (
        <>
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
                    {formatPrice(data.res?.payment_gateway?.amount)}đ
                </span>
            </div>
            {onCheckStatus()}
        </>
    );
}

export default PaymentInfo;