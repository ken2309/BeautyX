import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import useCountDown from '../../../utils/useCountDown';
import authentication from '../../../api/authApi';
import { AxiosError } from "axios";
import DialogNotification from './DialogNotification';
import icon from '../../../constants/icon';
import { CircularProgress } from "@mui/material";

function FormOtp(props: any) {
    const {
        data,
        handlePostTelephone,
        setStep
    } = props;
    const [errorCode, setErrorCode] = useState({
        code: 0,
        open: false,
        title: '',
        loading: false
    })
    //const [time, setTime] = useState(60)
    const sec = useCountDown(90)
    const handleOnResetPassword = async (params: any) => {
        setErrorCode({ ...errorCode, loading: true })
        try {
            await authentication.forgotPassword(params)
            setErrorCode({
                code: 200,
                open: true,
                title: 'Đổi mật khẩu thành công',
                loading: false
            })
        } catch (error) {
            const err = error as AxiosError;
            switch (err.response?.status) {
                case 400:
                    return setErrorCode({
                        open: true,
                        code: err.response?.status,
                        title: 'Mã xác thực không chính xác',
                        loading: false
                    })
                case 501:
                    return setErrorCode({
                        open: true,
                        code: err.response?.status,
                        title: 'Mã xác thực không chính xác',
                        loading: false
                    })
                default:
                    break
            }
        }
    }
    const formikTelephone = useFormik({
        initialValues: {
            otp: "",
            new_password: "",
            confirm_password: "",
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required("Vui lòng nhập mã xác thực")
                .matches(/^[0-9]+$/, "Mã xác thực không hợp lệ")
                .min(6, 'Mã xác thực gồm 6 ký tự')
                .max(6, 'Mã xác thực gồm 6 ký tự'),
            new_password: Yup.string()
                .min(8, "Mật khẩu lớn hơn 8 ký tự")
                .max(32, "Mật khẩu tối đa 32 kí tự")
                .required("Vui lòng nhập mật khẩu"),
            confirm_password: Yup.string()
                .required("Vui lòng xác nhận lại mật khẩu")
                .oneOf([Yup.ref("new_password"), null], "Mật khẩu không khớp"),
        }),
        onSubmit: (values) => {
            const params = {
                telephone: data.telephone,
                code: values.otp,
                new_password: values.new_password,
                verification_id: data.verification_id
            }
            handleOnResetPassword(params)
        },
    });
    const onReSendOtp = () => {
        handlePostTelephone(data.telephone);
        //setStep(1)
    }

    return (
        <>
            <DialogNotification
                errorCode={errorCode}
                setErrorCode={setErrorCode}
            />
            <div id="recaptcha-container" ></div>
            <div className="flex-row-sp for-pass-cnt__phone-head">
                <button
                    onClick={() => setStep(1)}
                >
                    <img src={icon.chevronLeft} alt="" />
                </button>
                <span>Đổi mật khẩu</span>
                <div></div>
            </div>
            <div className="flex-column for-pass-cnt__phone-noti">
                <span>Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến</span>
                <span>{data.telephone}</span>
                <form
                    autoComplete='off'
                    className="flex-column for-pass-phone"
                    onSubmit={formikTelephone.handleSubmit}
                >
                    <input
                        name="otp"
                        value={formikTelephone.values.otp}
                        onChange={formikTelephone.handleChange}
                        type="text"
                        style={{ textAlign: 'center' }}
                        className="for-pass-cnt__phone-ip"
                        placeholder='Mã xác thực'
                    />
                    {
                        formikTelephone.errors.otp && formikTelephone.touched.otp &&
                        <span className="for-pass-cnt__phone-err">
                            {formikTelephone.errors.otp}
                        </span>
                    }
                    <input
                        name="new_password"
                        value={formikTelephone.values.new_password}
                        onChange={formikTelephone.handleChange}
                        type="text"
                        style={{ textAlign: 'center' }}
                        className="for-pass-cnt__phone-ip"
                        placeholder='Mật khẩu mới'
                    />
                    {
                        formikTelephone.errors.new_password && formikTelephone.touched.new_password &&
                        <span className="for-pass-cnt__phone-err">
                            {formikTelephone.errors.new_password}
                        </span>
                    }
                    <input
                        name="confirm_password"
                        value={formikTelephone.values.confirm_password}
                        onChange={formikTelephone.handleChange}
                        type="text"
                        style={{ textAlign: 'center' }}
                        className="for-pass-cnt__phone-ip"
                        placeholder='Nhập lại mật khẩu'
                    />
                    {
                        formikTelephone.errors.confirm_password && formikTelephone.touched.confirm_password &&
                        <span className="for-pass-cnt__phone-err">
                            {formikTelephone.errors.confirm_password}
                        </span>
                    }
                    <div className="for-pass-cnt__time">
                        {
                            sec > 0 ?
                                <>Vui lòng chờ <span>{sec}</span> để nhận lại mã xác thực</>
                                :
                                <span onClick={onReSendOtp} >Gửi lại mã</span>
                        }
                    </div>
                    <button
                        className='for-pass-cnt__btn'
                        type='submit'
                    >
                        {
                            errorCode.loading === true &&
                            <div className="sign-loading">
                                <CircularProgress size="25px" color="inherit" />
                            </div>
                        }
                        Tiếp theo
                    </button>
                </form>
            </div>
        </>
    );
}

export default FormOtp;