import React from 'react';
import { Container } from '@mui/material';
import './style.css';

function ResetPassword() {
    return (
        <Container>
            <div
                className='for-pass-cnt'
            >
                <div className="for-pass-cnt__phone">
                    <div className="for-pass-cnt__phone-head">
                        <span>Đặt lại mật khẩu</span>
                    </div>
                    <form className="flex-column for-pass-phone">
                        <input type="text" className="for-pass-cnt__phone-ip" placeholder='Số điện thoại' />
                        <span className="for-pass-cnt__phone-err">
                            Số điện thoại không hợp lệ
                        </span>
                        <button>Tiếp theo</button>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default ResetPassword;