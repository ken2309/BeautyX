import React, { useEffect, useState } from 'react';
import { auth, firebase } from '../../firebase';
import authentication from '../../api/authApi';

function Otp(props: any) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('')
    const [values, setValues] = useState({
        telephone: '0583580050',
        new_password: '',
        code: '',
        verification_id: ''
    })
    const sign = () => {
        if (phoneNumber === "") return;

        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible'
        });

        auth.signInWithPhoneNumber(phoneNumber, verify).then((result) => {
            console.log(result)
            setValues({
                ...values,
                verification_id: result?.verificationId
            })
        })
            .catch((err) => {
                console.log(err)
            });
    }
    const handleForgotPass = async () => {
        try {
            await authentication.forgotPassword(values);
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = () => {
        handleForgotPass()
    }


    return (
        <div>
            <div id="recaptcha-container"></div>
            <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
            <button onClick={sign} >send otp</button>
            <br />
            <span>--------------</span>
            <input type="text" onChange={(e) => setValues({ ...values, telephone: e.target.value })} placeholder='Sdt' />
            <input type="text" onChange={(e) => setValues({ ...values, new_password: e.target.value })} placeholder='new pass' />
            <input type="text" onChange={(e) => setValues({ ...values, code: e.target.value })} placeholder='Otp' />
            <button
                onClick={onSubmit}
            >
                submit
            </button>
        </div>
    );
}

export default Otp;