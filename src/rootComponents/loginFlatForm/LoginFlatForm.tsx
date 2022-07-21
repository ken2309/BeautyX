import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncUser } from '../../redux/USER/userSlice';
import { FLAT_FORM_TYPE } from '../flatForm';
import { loginAsyncMomo, loginAsyncTiki, loginAsyncMb } from '../../redux/loginFlatForm/loginFlatFrom';
import { pickBy, identity } from 'lodash';
// import { AnyAaaaRecord } from 'dns';

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
        const PARAMS_OB = {
            "customerId": params?.customerId,
            "avatar": params?.avatar,
            "email": params?.email,
            "name": params?.name,
            "phone": params?.telephone,
            "authCode": params?.authCode
        }
        const PARAMS = pickBy(PARAMS_OB, identity);
        await dispatch(loginAsyncTiki(PARAMS))
        await dispatch(fetchAsyncUser())
    }
    const onLoginFlatFormMB = async () => {
        // let $: any = window;
        // const res = await $["ReactNativeWebView"].postMessage(JSON.stringify({
        //     type: "GET_LOCATION",
        // }));
        // $.addEventListener("message", (event: any) => {
        //     alert("flatForm: " + flatForm);
        //     // alert("msg: " + JSON.stringify(event.data));
        // });
        
        try{
            // window.sessionStorage.setItem("_WEB_TK", '4220|VCWtPxfJBqjB2zjS3t0l')
            await dispatch(loginAsyncMb({
                token: params.loginToken,
            }))
            await dispatch(fetchAsyncUser())
            
        }catch(err){
            console.warn(err)
        }
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
                case FLAT_FORM_TYPE.MB:
                    onLoginFlatFormMB();
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
    console.log(JSON.stringify(params))
    return (
        <div>

        </div>
    );
}

export default LoginFlatForm;