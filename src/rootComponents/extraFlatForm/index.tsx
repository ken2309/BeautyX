import React from 'react';
import { useLocation } from 'react-router-dom';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
import { FLAT_FORM_TYPE } from '../flatForm';
import LoginFlatForm from '../loginFlatForm/LoginFlatForm';


function ExtraFlatForm() {
    //?email=toan@myspa.vn&telephone=0392645745&name=Nguyễn Ngọc Toàn&avatar=&authCode=ZVq7VgWLum0PJnDB_IoYH5TQDvk-9Kf7xqlhrwUXRvg.DFhW9eR9MBHs4ph0E7fF--DilhrB_MOGjexM0XccP00&customerId=9252438"
    //?email=toan@myspa.vn&telephone=0392645745&name=m&momo=true
    const location = useLocation();
    const params = extraParamsUrl();

    const flatForm = location.pathname.slice(1, params ? location.pathname.length - 1 : location.pathname.length);
    const FLAT_FORM = sessionStorage.getItem('FLAT_FORM');
    if (!FLAT_FORM) {
        switch (flatForm) {
            case "home":
                sessionStorage.setItem('FLAT_FORM', 'BEAUTYX');
                break;
            case FLAT_FORM_TYPE.MOMO:
                sessionStorage.setItem('FLAT_FORM', FLAT_FORM_TYPE.MOMO);
                break
            case FLAT_FORM_TYPE.TIKI:
                sessionStorage.setItem('FLAT_FORM', FLAT_FORM_TYPE.TIKI);
                break
            case FLAT_FORM_TYPE.MB:
                // sessionStorage.setItem('FLAT_FORM', 'BEAUTYX');
                sessionStorage.setItem('FLAT_FORM', FLAT_FORM_TYPE.MB);
                sessionStorage.setItem('_loginToken', params?.loginToken+'');
                break
            default:
                sessionStorage.setItem('FLAT_FORM', 'BEAUTYX');
        }
    }

    return (
        <LoginFlatForm
            flatForm={flatForm}
            params={params}
        />
    );
}

export default ExtraFlatForm;