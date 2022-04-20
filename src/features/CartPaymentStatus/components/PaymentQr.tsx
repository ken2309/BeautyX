import React from 'react';
import formatPrice from '../../../utils/formatPrice';
import icon from '../../../constants/icon';

// interface IProps {
//     dataStatus: string,
//     pay_url: string
// }

function PaymentQr(props: any) {
    const { orderStatus, pay_url, res } = props;
    console.log(res)
    console.log(orderStatus)
    const checkStatus = () => {
        switch (orderStatus) {
            case "PENDING":
                return <iframe
                    className='pm-st-cnt__qr-cnt'
                    src={`${pay_url}`}
                    title="This is a unique title"
                />;
            case "PAID":
                return <div className='pm-success-cnt' >
                    <div className="flex-row-sp pm-success-cnt__head">
                        <span>Tổng tiền thanh toán</span>
                        <span>{formatPrice(res.payment_gateway.amount)}đ</span>
                    </div>
                    <div className="flex-column pm-success-cnt__body">
                        <div className="flex-column pm-success-cnt__body-top">
                            <img src={icon.sucessGreen} alt="" />
                            <span className="title">
                                Giao dịch thành công
                            </span>
                            <span className="amount">
                                {formatPrice(res.payment_gateway.amount)}đ
                            </span>
                        </div>
                        <div className="pm-success-cnt__body-cnt">
                            Bạn đã thành toán thanh công sô tiền <span>{formatPrice(res.payment_gateway.amount)}đ</span>
                            cho dịch vụ <span>Công ty cổ phần Myspa</span>
                        </div>
                        <div className="flex-row-sp pm-success-cnt__body-code">
                            <span>Mã thanh toán</span>
                            <span>{res.payment_gateway.transaction_uuid}</span>
                        </div>
                    </div>
                </div>;
            case "CANCELED_BY_USER":
                return <div className='pm-success-cnt' >
                    <div className="flex-row-sp pm-success-cnt__head">
                        <span>Tổng tiền</span>
                        <span>{formatPrice(res.payment_gateway.amount)}đ</span>
                    </div>
                    <div className="flex-column pm-success-cnt__body">
                        <div className="flex-column pm-success-cnt__body-top">
                            <img src={icon.xCircleRed} alt="" />
                            <span className="title" style={{ color: 'var(--red-cl)' }} >
                                Giao dịch thất bại
                            </span>
                            <span className="amount">
                                {formatPrice(res.payment_gateway.amount)}đ
                            </span>
                        </div>
                        <div className="pm-success-cnt__body-cnt">
                            Đã hủy thanh toán thành công sô tiền <span>{formatPrice(res.payment_gateway.amount)}đ</span>
                            cho dịch vụ <span>Công ty cổ phần Myspa</span>
                        </div>
                    </div>
                </div>;
            default:
                break;
        }
    }
    return (
        <div
            className='pm-st-cnt__qr'
        >
            {checkStatus()}
        </div>
    );
}

export default PaymentQr;