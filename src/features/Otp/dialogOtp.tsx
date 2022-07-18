import React, { useState } from "react";
import { Dialog } from "@mui/material";
import "../ResetPassword/style.css";
import { formatTelephone } from "../ResetPassword";
import { auth, firebase } from "../../firebase";

function dialogOtp(props: any) {
    const { open } = props;
    const handleForgotPass = async () => {
        try {
           
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = () => {
        handleForgotPass()
    }
    return (
        <Dialog open={open} fullScreen>
            <div>
                <span>--------------</span>
                <input type="text"  placeholder='Otp' />
                <button
                    onClick={onSubmit}
                >
                    submit
            </button>
            </div>
        </Dialog>
    );
}

export default dialogOtp;
