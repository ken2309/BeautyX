import React, { useState } from 'react';
import { Container } from '@mui/material';
import './style.css';
import FormTelephone from './components/FormTelephone';
import FormOtp from './components/FormOtp';
import { auth, firebase } from '../../firebase';
import FormHead from './components/FormHead';
import Footer from '../Footer';


export const formatTelephone = (telephone: string) => {
    const phone = `${telephone}`.slice(-9)
    return `+84${phone}`
}
function ResetPassword() {
    const [values, setValues] = useState({
        telephone: '',
        new_password: '',
        code: '',
        verification_id: ''
    })
    const [step, setStep] = useState(1)
    //send otp
    const handleRecapcha = () => {
        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible'
        });
        return verify
    }
    const handlePostTelephone = (telephone: string) => {
        const phoneNumber = formatTelephone(telephone)
        if (phoneNumber === "") return;
        const verify = handleRecapcha();
        auth.signInWithPhoneNumber(phoneNumber, verify).then((result) => {
            console.log(result)
            setValues({
                ...values,
                telephone: telephone,
                verification_id: result?.verificationId
            })
            setStep(2)
        })
            .catch((err) => {
                console.log(err)
            });
    }
    const onSwitchStep = () => {
        switch (step) {
            case 1:
                return <FormTelephone
                    setValues={setValues}
                    setStep={setStep}
                    handlePostTelephone={handlePostTelephone}
                />;
            case 2:
                return <FormOtp
                    data={values}
                    setStep={setStep}
                    handlePostTelephone={handlePostTelephone}
                />
            default:
                break;
        }
    }


    return (
        <>
            <FormHead />
            <Container>
                <div
                    className='for-pass-cnt'
                >
                    <div className="for-pass-cnt__phone">
                        {onSwitchStep()}
                    </div>
                </div>
            </Container>
            <div className="for-footer">
                <Footer />
            </div>
        </>
    );
}

export default ResetPassword;