import React, { useContext, useState, KeyboardEvent } from 'react';
import img from '../../constants/img';
import './style.css'
import { AppContext } from '../../context/AppProvider';
import { Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer';
//import { Link } from 'react-router-dom'

// window.location.assign(deepLink);

function SellerCenter() {
    const history = useHistory();
    const { t } = useContext(AppContext)
    const [sub, setSub] = useState('')
    const onGotoManager = () => {
        if (sub.length > 0) {
            const newWindow = window.open(`https://${sub}.myclinic.vn`, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }
        // const a = document.createElement('a');
        // a.href = `https://${sub}.myspa.vn/moba_manager/dashboard`;
        // a.target = '_blank';
        // a.click();
    }
    // const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
    //         onGotoManager();
    //     }
    // };
    return (
        <>
            {/* <Head /> */}
            <div
                className='sel-cent-cnt'
            >
                <div className="sel-cent-cnt__head">
                    <Container>
                        <div className="flex-row-sp cnt">
                            <img
                                onClick={() => history.push('/home')}
                                src={img.beautyX}
                                alt=""
                            />
                            <button
                                onClick={() => history.push('/partner')}
                            >
                                {t("Header.1")}
                            </button>
                        </div>
                    </Container>
                </div>
                <img src={img.sellerCenterImg} alt="" />
                <div className="sel-cent-cnt__form">
                    <div className="container">
                        <div className="form-cnt">
                            <img className='logo' src={img.beautyX} alt="" />
                            <span className="title">Xin mời đăng nhập</span>
                            <div className="inp">
                                <input
                                    //onKeyDown={handleKeyDown}
                                    onChange={(e) => setSub(e.target.value)}
                                    type="text"
                                    placeholder='Nhập địa chỉ subdomain'
                                />
                                <div className="inp-right">
                                .myclinic.vn
                                </div>
                            </div>
                            <div className="form-cnt__btn">
                                {/* {
                                    sub.length > 0 &&
                                    <button
                                        onClick={onGotoManager}
                                    >
                                        <Link
                                            to={{
                                                pathname: `https://${sub}.myspa.vn/moba_manager/dashboard`
                                            }}
                                            target="_blank"
                                        >
                                            Tiếp tục
                                        </Link>
                                    </button>
                                } */}
                                <button
                                    onClick={onGotoManager}
                                >
                                    Tiếp tục
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SellerCenter;