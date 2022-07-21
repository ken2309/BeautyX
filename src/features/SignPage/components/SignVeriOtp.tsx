import React from "react";
import { Dialog } from "@mui/material";
import "../../ResetPassword/style.css";
import { formatTelephone } from "../../ResetPassword";
import { auth, firebase } from "../../../firebase";
import FormTelephone from "../../ResetPassword/components/FormTelephone";

function SignVeriOtp(props: any) {
    const { open, setOpen, setDataOtp } = props;
    const handlePostTelephone = (telephone: string) => {
        const phoneNumber: any = formatTelephone(telephone);
        if (phoneNumber === "") return;
        let verify = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
            }
        );
        auth.signInWithPhoneNumber(phoneNumber, verify)
            .then((result) => {
                console.log(result);
                setDataOtp({
                    telephone: telephone,
                    verification_id: result?.verificationId,
                });
                setOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Dialog open={open} fullScreen>
            <div className="for-pass-cnt">
                <div className="for-pass-cnt__phone">
                    <div id="recaptcha-container"></div>
                    <FormTelephone
                        title="Đăng ký"
                        handlePostTelephone={handlePostTelephone}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default SignVeriOtp;
