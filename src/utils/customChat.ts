import {FLAT_FORM_TYPE} from '../rootComponents/flatForm';
import { callApiFromTiki } from '../rootComponents/tiki/doPostMessageTiki';
export const handleSubiz = () => {
    let $:any = window;
    let su_widget =  document.querySelector("#cprhliqipldavybercftg .widget-container.widget-container--right");
    (!su_widget)&&(su_widget=document.getElementById("cprhliqipldavybercftg"))
    // eslint-disable-next-line no-undef
    console.log(su_widget);
    su_widget?.classList.add('myspa_subiz_widget')
    // eslint-disable-next-line no-undef
    $.subiz('expandWidget');
    // eslint-disable-next-line no-undef
    $.subiz('checkPushNotification', function(status:any) {
        console.log(status)
    })
}   
export const handleChat = () => {
    const FLAT_FORM = sessionStorage.getItem('FLAT_FORM');
    switch(FLAT_FORM){
        case FLAT_FORM_TYPE.TIKI:
            // callApiFromTiki('openDeeplink',{url:'https://m.me/beautyxdatlichlamdep/'})
            handleSubiz()
        break;
        default:
            window.open("https://m.me/beautyxdatlichlamdep/", "_blank");
        break;

    }
}
