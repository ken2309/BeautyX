import React from 'react';
import { Dialog } from '@mui/material';
import icon from '../../../constants/icon';

function PaymentBranch(props: any) {
    const { open, setOpen, org, setChooseBr, chooseBr } = props;
    return (
        <Dialog
            open={open}
            onClick={() => setOpen(false)}
        >
            <div className="cart-list-branch">
                <ul>
                    {
                        org?.branches?.map((item: any, index: number) => (
                            <li
                                key={index}
                                onClick={() => setChooseBr(item)}
                            >
                                <div className="branch-item">
                                    <span className="flex-row br-name">
                                        {chooseBr === item && <img src={icon.success} alt="" />}
                                        {item?.name}
                                    </span>
                                    <span className="br-address">
                                        Địa chỉ : {item?.full_address}
                                    </span>
                                    <span className="br-address">
                                        Liên hệ : {item?.telephone}
                                    </span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Dialog>
    );
}

export default PaymentBranch;