import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
 
import { fetchAsyncUser } from '../../redux/USER/userSlice';
import { FLAT_FORM_TYPE } from '../flatForm';
import { loginAsyncMomo, loginAsyncTiki } from '../../redux/loginFlatForm/loginFlatFrom'

function LoginFlatForm(props: any) {
    const dispatch = useDispatch();
    const { flatForm, params } = props;
    const TOKEN = sessionStorage.getItem('_WEB_TK')
    const onLoginFlatFormMomo = async () => {
        const PARAMS = {
            "fullname": params?.fullname,
            "email": params?.email,
            "telephone": params?.telephone
        }
        await dispatch(loginAsyncMomo(PARAMS))
        await dispatch(fetchAsyncUser())
    }
    const onLoginFlatFormTiki = async () => {
        const PARAMS = {
            "customerId": params?.customerId,
            "avatar": params?.avatar,
            "email": params?.email,
            "name": params?.name,
            "phone": params?.telephone,
            "authCode": params?.authCode
        }
        await dispatch(loginAsyncTiki(PARAMS))
        await dispatch(fetchAsyncUser())
    }
    const handleLoginFlatform = () => {
        if (params) {
            switch (flatForm) {
                case FLAT_FORM_TYPE.MOMO:
                    onLoginFlatFormMomo()
                    break;
                case FLAT_FORM_TYPE.TIKI:
                    onLoginFlatFormTiki()
                    break;
                default:
                    break
            }
        }
    }
    useEffect(() => {
        if (!TOKEN) {
            handleLoginFlatform()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>

        </div>
    );
}

export default LoginFlatForm;