import React, { useState } from 'react';
import icon from '../../constants/icon';
import ButtonLoading from '../../components/ButtonLoading';
import doPostMakePaymentMessageTiki from '../tiki/doPostMessageTiki';
import useGetMessageTiki from '../tiki/useGetMessageTiki';
import tikiAuthApi from '../../api/_tikiAuthApi';
import { useHistory } from 'react-router-dom';
import { fetchAsyncUser } from '../../redux/USER/userSlice'
import './style.css'
import { useDispatch } from 'react-redux';

function LoginFlatFormRequest(props: any) {
    const { pathname } = props;
    const history = useHistory();
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const handleLogin = () => {
        setLoad(true)
        doPostMakePaymentMessageTiki({
            TYPE: "LOGIN",
            params: 1
        })
    }

    const handleLoginTiki = async (params: any) => {
        try {
            const res = await tikiAuthApi.login(params);
            window.sessionStorage.setItem("_WEB_TK", res.data.context.token)
            await dispatch(fetchAsyncUser())
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
    if (response?.requestId && response.result.status === "success") {
        handleLoginTiki(response.result.res)
        //alert(JSON.stringify(response.result.res))
    }

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