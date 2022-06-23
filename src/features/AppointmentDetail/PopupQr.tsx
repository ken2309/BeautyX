import React from 'react';
import { Dialog } from '@mui/material'


function PopupQr(props: any) {
    const { open, setOpen, qr } = props;
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div
                style={{width:"86vw", borderRadius:"8px"}}
            >
                <img style={{borderRadius:"8px"}} src={qr} alt="" />
            </div>
        </Dialog>
    );
}

export default PopupQr;