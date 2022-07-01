/* eslint-disable */
// @ts-ignore
import Miniapi from '@momo-miniapp/api';
/* eslint-enable */
Miniapi.init({ appId: process.env.REACT_APP_MOMO_APP_ID });
export const MOMO_APIs = {
   
}
const $:any = window;
export function MOMO_API(event_name:String){
    try{
        $.dataLayer.push({'event': {event_name}});
    }catch(err){
        console.log(err);
    }
}
export default MOMO_API;