/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import './style.css'
import icon from '../../constants/icon';
import ButtonLoading from '../../components/ButtonLoading';
import { FLAT_FORM_TYPE } from '../flatForm';
import { EXTRA_FLAT_FORM } from '../../api/extraFlatForm';
// SLICE 

import { fetchAsyncUser } from '../../redux/USER/userSlice';
import { fetchAsyncApps } from '../../redux/appointment/appSlice'
import { EXTRA_REDUCER_STATUS } from '../../redux/status';

// ==== END

// MOMO

import momoApi, {
    IUserConsentsData,
    IUserConsentsStatus,
    IUserConsents
} from '../../api/momoApi';
import momoAuthApi from '../../api/_momoAuthApi';
import {
    MOMO
} from '../../api/_momoImport';


// ==== END
// TIKI

import tikiAuthApi from '../../api/_tikiAuthApi';
import doPostMakePaymentMessageTiki from '../tiki/doPostMessageTiki';
import useGetMessageTiki from '../useGetMessageTiki';

// ==== END 

// MB BANK
import { loginAsyncMb } from '../../redux/loginFlatForm/loginFlatFrom'
import { exitMbMiniApp } from '../mb/doPostMessageMBbank';
// ==== END
function LoginFlatFormRequest(props: any) {
    const { pathname, setClose } = props;
    const history = useHistory();
    const [load, setLoad] = useState(false);
    const platform = EXTRA_FLAT_FORM();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        setLoad(true)
        switch (platform) {
            case FLAT_FORM_TYPE.MOMO:
                handleLoginMomo()
                break;
            case FLAT_FORM_TYPE.TIKI:
                doPostMakePaymentMessageTiki({
                    TYPE: "LOGIN",
                    params: 1
                })
                break;
            case FLAT_FORM_TYPE.MB:
                handleLoginMB();
                break;
            default:
                break
        }
    }

    const handleLoginTiki = async (params: any) => {
        try {
            const res = await tikiAuthApi.login(params);
            window.sessionStorage.setItem("_WEB_TK", res.data.context.token)
            fetchAsyncUserAndinitApp();
            setLoad(false)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
    }
    const handleLoginMomo = async () => {
        try {
            MOMO.showLoading([""]);
            MOMO.getUserConsents({
                "permissions": [
                    {
                        "role": "name",
                    },
                    {
                        "role": "phone"
                    },
                    {
                        "role": "email",
                    },
                ]
            }, async ({ data, status }: any) => {
                const dataOb: IUserConsentsData = {
                    email: data?.email,
                    name: data?.name,
                    phone: data?.phone
                }
                alert(JSON.stringify(dataOb))
                if (dataOb.phone) {
                    setLoad(false)
                    // const ObTest = {
                    //     email: '',
                    //     name: 'NGUYEN KIM TUYEN',
                    //     phone: '0583580050'
                    // }
                    const res = await momoAuthApi.login(dataOb)
                    alert('res' + JSON.stringify(res))
                    window.sessionStorage.setItem("_WEB_TK", res.data.context.token)
                    fetchAsyncUserAndinitApp();
                }
                else {
                    requestUserConsents();
                    // MOMO.showToast({
                    //     description: "có lỗi khi nhận thông tin từ momo",
                    //     type: "failure",
                    //     duration: 2000
                    // });
                    // MOMO.hideLoading()
                }
                return { data: data }
            })

        }
        catch (err) {
            alert(JSON.stringify(err));
            setLoad(false)
        }

    }
    const requestUserConsents = () => {
        MOMO.showLoading([""]);
        MOMO.requestUserConsents({
            "permissions": [
                {
                    "role": "name",
                    "require": true
                },
                {
                    "role": "phone"
                },
                {
                    "role": "email",
                }
            ]
        }, async ({ data, status }: any) => {
            alert(JSON.stringify(data))
            setLoad(false)
            if (data.phone) {
                const res = await momoAuthApi.login(data)
                alert('res' + JSON.stringify(res))
                fetchAsyncUserAndinitApp();
            }
            else {
                MOMO.showToast({
                    description: "có lỗi khi nhận thông tin từ momo",
                    type: "failure",
                    duration: 2000
                });
                MOMO.hideLoading()
            }
            return { data: data }
        })
    }
    const handleLoginMB = async () => {
        const session = sessionStorage.getItem("_loginToken");
        const res = await dispatch(loginAsyncMb({
            token: session,
        }))
        if (res.meta.requestStatus === EXTRA_REDUCER_STATUS.FULFILLED) {
            fetchAsyncUserAndinitApp();
        }
        else if (res.meta.requestStatu === EXTRA_REDUCER_STATUS.REJECTED) {
            const resData = res.payload.response.data;
            if ((resData.message === 'invalid-session-token' || resData.message === 'invalid-session-customer') && resData.status === 401) {
                alert('phiên đăng nhập đã hết hạn!')
                exitMbMiniApp()
            }
        }
        setLoad(false)
    }
    // ==== utils custom
    async function fetchAsyncUserAndinitApp() {
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
    }
    // ====
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