import React from 'react';
import formatPrice from '../../../utils/formatPrice';
import icon from '../../../constants/icon';
import img from '../../../constants/img';
import onErrorImg from '../../../utils/errorImg';
import { EXTRA_PAYMENT } from '../../../rootComponents/extraPayment';
import { FLAT_FORM_TYPE } from '../../../rootComponents/flatForm';
import { EXTRA_FLAT_FORM } from '../../../api/extraFlatForm';
import doPostMakePaymentMessageTiki from '../../../rootComponents/tiki/doPostMessageTiki';

function PaymentQr(props: any) {
    const { orderStatus, res } = props;
    const org = res?.organization;
    const EX_PAYMENT = EXTRA_PAYMENT(res);
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const deepLink = EX_PAYMENT?.deepLink;
    const pay_url = EX_PAYMENT?.qrCode;
    const EXTRA_PAYMENT_ID = EX_PAYMENT?.EXTRA_PAYMENT_ID;
    const openDeepLinkPayment = () => {
        if (FLAT_FORM) {
            switch (FLAT_FORM) {
                case FLAT_FORM_TYPE.MOMO:
                    return window.location.assign(EXTRA_PAYMENT_ID);
                case FLAT_FORM_TYPE.TIKI:
                    return doPostMakePaymentMessageTiki({
                        TYPE: "ORDER",
                        params: EXTRA_PAYMENT_ID
                    })
                default:
                    const newWindow = window.open(`${deepLink}`, '_blank', 'noopener,noreferrer');
                    if (newWindow) newWindow.opener = null
                    break
            }
        }
    }
    const checkStatus = () => {
        switch (orderStatus) {
            case "PENDING":
                return <div>
                    <div className="pay-view-mb">
                        <div className="flex-column pay-view-mb__cnt">
                            <img src={img.imgDefault} alt="" className="pay-view-mb__img" />
                            <div className="pay-view-mb__title">
                                Thanh toán CÔNG TY CỔ PHẦN MYSPA qua Ví MoMo
                            </div>
                            <div className="flex-row-sp pay-view-mb__amount">
                                <span>Số tiền</span>
                                <span>{formatPrice(res?.payment_gateway?.amount)}đ</span>
                            </div>
                            <div className="pay-view-mb__org">
                                <img
                                    src={org?.image_url}
                                    onError={(e) => onErrorImg(e)} alt=""
                                    className="pay-view-mb__org-avt"
                                />
                                <div className="pay-view-mb__org-de">
                                    <span className="org-name">{org?.name}</span>
                                    <span className="org-address">
                                        {org?.full_address}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={openDeepLinkPayment}
                                className='payment-mb-ewall__btn' >
                                Thanh toán với {FLAT_FORM === FLAT_FORM_TYPE.TIKI ? FLAT_FORM : FLAT_FORM_TYPE.MOMO}
                            </button>
                        </div>
                    </div>
                    <div className='pay-view-pc' >
                        <iframe
                            className='pm-st-cnt__qr-cnt'
                            src={`${pay_url}`}
                            title="This is a unique title"
                        />
                    </div>
                </div>;
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
            case "CANCELED":
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