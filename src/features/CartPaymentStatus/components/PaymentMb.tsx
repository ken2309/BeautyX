import React from 'react';
import img from '../../../constants/img';

function PaymentMb(props: any) {
    return (
        <div
            className='pay-view-mb__cnt'
        >
            <img src={img.beautyX} alt="" className="pay-view-mb__cnt-logo" />
        </div>
    );
}

export default PaymentMb;