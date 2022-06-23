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