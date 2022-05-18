import React from 'react';
import icon from '../../constants/icon';
import ButtonLoading from '../../components/ButtonLoading';
import './style.css'

function LoginFlatFormRequest() {
    const handleLogin = () => {

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
                loading={false}
            />
        </div>
    );
}

export default LoginFlatFormRequest;