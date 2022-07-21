/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import icon from '../../constants/icon';
import ButtonLoading from '../../components/ButtonLoading';
import doPostMakePaymentMessageTiki from '../tiki/doPostMessageTiki';
import useGetMessageTiki from '../useGetMessageTiki';
import tikiAuthApi from '../../api/_tikiAuthApi';
import mbAuthApi from '../../api/_mbAuthApi';
import { useHistory } from 'react-router-dom';
import { fetchAsyncUser } from '../../redux/USER/userSlice';
import { loginAsyncMb } from '../../redux/loginFlatForm/loginFlatFrom'
import './style.css'
import { useDispatch } from 'react-redux';
import { fetchAsyncApps } from '../../redux/appointment/appSlice'
import dayjs from 'dayjs';
import { EXTRA_FLAT_FORM } from '../../api/extraFlatForm';
import { FLAT_FORM_TYPE } from '../flatForm';
import momoApi from '../../api/momoApi';
import SignVeriOtp from '../../features/SignPage/components/SignVeriOtp';
import Otp from '../../features/Otp/dialogOtp';
function LoginFlatFormRequest(props: any) {
    const { pathname, setClose } = props;
    const history = useHistory();
    const [load, setLoad] = useState(false);
    const [openOtp, setOpenOtp] = useState(false);
    const [dataOtp, setDataOtp] = useState({
        telephone: '',
        verification_id: '',
        code: ''
    })
    const platform = EXTRA_FLAT_FORM();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        setLoad(true)
        switch (platform) {
            case FLAT_FORM_TYPE.MOMO:
                // onLoginFlatFormMomo()
                handleLoginMomo()
                break;
            case FLAT_FORM_TYPE.TIKI:
                doPostMakePaymentMessageTiki({
                    TYPE: "LOGIN",
                    params: 1
                })
                break;
            case FLAT_FORM_TYPE.MB:
                handleOtpMB();
                break;
            default:
                break
        }
        // let $: any = window;
        // $['ReactNativeWebView']?.postMessage(JSON.stringify(
        //     {
        //         type: 'PAYMENT_HUB_TRANSACTION',
        //         data: {
        //             "id": "AW1125WDEIWH",
        //             "amount": 600000,
        //             "description": "Test 11dat",
        //             "successMessage": null,
        //             "merchant": {
        //                 "code": "PHZMSP",
        //                 "name": "Công ty cổ phần MySpa"
        //             },
        //             "type": {
        //                 "name": "Thanh toán sản phẩm làm đẹp",
        //                 "code": "MSPPROD",
        //                 "allowCard": true
        //             },
        //         }
        //     }
        // ))
        // console.log(res)
        // alert(JSON.stringify(res))
    }

    const handleLoginTiki = async (params: any) => {
        try {
            const res = await tikiAuthApi.login(params);
            window.sessionStorage.setItem("_WEB_TK", res.data.context.token)
            const res_user = await dispatch(fetchAsyncUser());
            if (res_user.payload) {
                dispatch(fetchAsyncApps(dayjs().format("YYYY-MM")))
            }
            if (setClose) return setClose(false)
            if (pathname && pathname === "/tai-khoan/thong-tin-ca-nhan") {
                history.push('/home')
            } else {
                history.goBack()
            }
            setLoad(false)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
    }
    const handleLoginMomo = async () => {
        try {
            const res = await momoApi.getUserConsents();
            const resRequest = await momoApi.requestUserConsents();
            const resLocale = await momoApi.getLocation();
            alert(JSON.stringify(res));
            alert(JSON.stringify(resRequest))
            // alert(JSON.stringify(resLocale));
            setLoad(false)
        }
        catch (err) {
            alert(JSON.stringify(err));
            setLoad(false)
        }

    }
    const handleOtpMB = () => {
        setOpenOtp(true);
        setLoad(false)
        openOtp&&console.log(dataOtp);
    }
    const handleLoginMB = async (code:String) => {
        try {
            // (!openOtp)&&setOpenOtp(true);
            window.sessionStorage.setItem("_WEB_TK", '4220|VCWtPxfJBqjB2zjS3t0l')
            const session = sessionStorage.getItem("_loginToken");
            const paramsOb = {
                "token": session,
                "telephone": dataOtp.telephone,
                "code": code,
                "verification_id": dataOtp.verification_id
            }
            console.log(paramsOb);

            // await dispatch(fetchAsyncUser())
        }
        catch (err) {
            console.log(err)
        }
    }
    const response = useGetMessageTiki();
    useMemo(() => {
        // alert(JSON.stringify(response))
        if (response?.requestId && response.result.status === "success") {
            handleLoginTiki(response.result.res)
        }
        else if (response?.requestId && response.result.status === "fail") {
            setLoad(false);
        }
    }, [response])
    return (
        <div className='flex-column login-re-cnt'>
            <img src={icon.loginReq} alt="" />
            <span className="title">Yêu cầu truy cập thông tin</span>
            <div className="content">
                Cho phép sử dụng thông tin <span>Họ tên, Số điện thoại, Email</span> của bạn.
            </div>
            <ButtonLoading
                title='Cho phép truy cập'
                onClick={handleLogin}
                loading={load}
            />
            {
                platform === FLAT_FORM_TYPE.MB
                &&
                (
                    <>
                        <Otp
                            open={openOtp}
                            setOpen={setOpenOtp}
                            setDataOtp={setDataOtp}
                            dataOtp={dataOtp}
                            handleSubmit= {handleLoginMB}
                        />
                    </>
                )
            }
        </div>
    );
}

export default LoginFlatFormRequest;