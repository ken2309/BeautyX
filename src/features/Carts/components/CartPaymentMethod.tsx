import React from 'react';
import { Drawer } from '@mui/material';
import PaymentMethod from '../../CartPayment/components/PaymentMethod';
import useFullScreen from '../../../utils/useFullScreen';

function CartPaymentMethod(props: any) {
    const { open, setOpen, pmtMethod, setPmtMethod } = props;
    const IS_MB = useFullScreen();
    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor={IS_MB ? "bottom" : "right"}
            >
                <div className='re-cart-pmt-drawer' >
                    <PaymentMethod
                        e={pmtMethod}
                        onPaymentMethodChange={setPmtMethod}
                        setOpen={setOpen}
                    />
                </div>
            </Drawer>
        </>
    );
}

export default CartPaymentMethod;