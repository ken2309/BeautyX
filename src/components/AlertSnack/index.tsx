import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface IProps {
    open: boolean,
    onClose: () => void;
    title: string,
    status?: string
}

function AlertSnack(props: IProps) {
    const { open, onClose, title, status } = props;
    const handleClose = () => {
        onClose()
    }

    let color: any = "success";
    if (status === "SUCCESS") {
        color = "success"
    } else if (status === "FAIL") {
        color = "error"
    } else if (status === "WARNING") {
        color = "warning"
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open} autoHideDuration={3000} onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
                {title}
            </Alert>
        </Snackbar>
    );
}

export default AlertSnack;