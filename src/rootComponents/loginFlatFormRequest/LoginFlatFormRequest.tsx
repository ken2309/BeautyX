/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import icon from '../../constants/icon';
import ButtonLoading from '../../components/ButtonLoading';
import doPostMakePaymentMessageTiki from '../tiki/doPostMessageTiki';
import useGetMessageTiki from '../tiki/useGetMessageTiki';
import tikiAuthApi from '../../api/_tikiAuthApi';
import { useHistory } from 'react-router-dom';
import { fetchAsyncUser } from '../../redux/USER/userSlice'
import './style.css'
import { useDispatch } from 'react-redux';
import { fetchAsyncApps } from '../../redux/appointment/appSlice'
import dayjs from 'dayjs';

function LoginFlatFormRequest(props: any) {
    const { pathname, setClose } = props;
    const history = useHistory();
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const handleLogin = async () => {
        setLoad(true)
        doPostMakePaymentMessageTiki({
            TYPE: "LOGIN",
            params: 1
        })
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
        </div>
    );
}

export default LoginFlatFormRequest;