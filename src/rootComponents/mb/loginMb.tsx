import { useState } from "react";
import Otp from '../../features/Otp/dialogOtp';

function OtpC() {
    
}
function index(){
    const [openOtp, setOpenOtp] = useState(false);
    const [dataOtp, setDataOtp] = useState({
        telephone: '',
        verification_id: '',
        code: ''
    })
    const handleUpdatePhone = async (code:String) => {
        try {
            // (!openOtp)&&setOpenOtp(true);
            // window.sessionStorage.setItem("_WEB_TK", '4220|VCWtPxfJBqjB2zjS3t0l')
            const session = sessionStorage.getItem("_loginToken");
            const paramsOb = {
                "token": session,
                "telephone": dataOtp.telephone,
                "code": code,
                "verification_id": dataOtp.verification_id
            }
            console.log(paramsOb);

            // await dispatch(fetchAsyncUser())
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <Otp
            open={openOtp}
            setOpen={setOpenOtp}
            setDataOtp={setDataOtp}
            dataOtp={dataOtp}
            handleSubmit= {handleUpdatePhone}
        />
    )
}
export default index;