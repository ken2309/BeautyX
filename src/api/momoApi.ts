// // Case 1: User accept sharing some data
// {
//     "data": {
//         "name": "John Doe",
//         "phone": "09xxxxxxxx"
//     },
//     "status": {
//         "email": "denied",
//         "name": "granted",
//         "phone": "granted"
//     }
// }

// // Case 2: User cancelled sharing data 
// {
//     "data" : {}
//     "status" : "cancelled"
// }

// // Case 3: AppId doesn’t have permission to request sharing data / Wrong appId. Go to developers.momoapp.vn to request permission
// {
//     "data" : {},
//     "status" : {}
// }


import momoAuthApi from './_momoAuthApi';
import { MOMO } from './_momoImport';

// interface 
<<<<<<< HEAD
export interface IUserConsentsData {
=======
type IToastType = 'success' | 'failure'
export interface IUserConsentsData{
>>>>>>> b1ada437284a4b4182fa444d41980c72238c254e
    phone?: string
    name?: string
    email?: string
}
export interface IUserConsentsStatus {
    email: "denied",
    name: "granted",
    phone: "granted"
}
export interface IUserConsents {
    data: IUserConsentsData | {}
    status: IUserConsentsStatus | "cancelled" | {}
}
// end 
class MOMO_API {
    requestUserConsents = () => {
        MOMO.showLoading([""]);
        MOMO.requestUserConsents({
            "permissions": [
                {
                    "role": "name",
                    "require": true
                },
                {
                    "role": "phone"
                },
                {
                    "role": "email",
                }
            ]
<<<<<<< HEAD
        }, async ({ data, status }: any) => {
            // const dispatch = useDispatch();
            // const location: any = useLocation();
            // const history = useHistory();
            // const pathname = location?.state?.from?.pathname;
            // alert(JSON.stringify(data))
            if (data.email && data.phone) {
                alert('in')
                const res = await momoAuthApi.login(data)
                alert('res' + JSON.stringify(res))
                // window.sessionStorage.setItem("_WEB_TK", res.data.context.token)
                // const res_user = await dispatch(fetchAsyncUser());
                // if (res_user.payload) {
                //     dispatch(fetchAsyncApps(dayjs().format("YYYY-MM")))
                // }
                // if (pathname && pathname === "/tai-khoan/thong-tin-ca-nhan") {
                //     history.push('/home')
                // } else {
                //     history.goBack()
                // }
=======
        }, async ({data,status}:any) => {
            // alert(JSON.stringify(data))
            if(data.email && data.phone){
                // alert('in')
                const res = await momoAuthApi.login(data)
                // alert('res'+JSON.stringify(res))
>>>>>>> b1ada437284a4b4182fa444d41980c72238c254e
            }
            else {
                MOMO.showToast({
                    description: "có lỗi khi nhận thông tin từ momo",
                    type: "failure",
                    duration: 2000
                });
                MOMO.hideLoading()
            }
            return { data: data }
        })
    }
    getUserConsents = async () => {
        MOMO.showLoading([""]);
        const res = await MOMO.getUserConsents({
            "permissions": [
                {
                    "role": "name",
                },
                {
                    "role": "phone"
                },
                {
                    "role": "email",
                },
            ]
<<<<<<< HEAD
        }, async ({ data, status }: any) => {
            // const dispatch = useDispatch();
            // const location: any = useLocation();
            // const history = useHistory();
            // const pathname = location?.state?.from?.pathname;
            const dataOb: IUserConsentsData = {
=======
        }, async ({data,status}:any) => {
            const dataOb:IUserConsentsData = {
>>>>>>> b1ada437284a4b4182fa444d41980c72238c254e
                email: data?.email,
                name: data?.name,
                phone: data?.phone
            }
<<<<<<< HEAD
            alert(JSON.stringify(dataOb))
            if (dataOb.email && dataOb.phone) {
=======
            // alert(JSON.stringify(dataOb))
            if(dataOb.email && dataOb.phone){
>>>>>>> b1ada437284a4b4182fa444d41980c72238c254e
                const res = await momoAuthApi.login(data)
                // alert('res'+JSON.stringify(res))
                window.sessionStorage.setItem("_WEB_TK", res.data.context.token)
            }
            else {
                this.requestUserConsents();
                MOMO.showToast({
                    description: "có lỗi khi nhận thông tin từ momo",
                    type: "failure",
                    duration: 2000
                });
                MOMO.hideLoading()
            }
            return { data: data }
        })
        return res

    }
    getLocation = () => {
<<<<<<< HEAD
        MOMO.getLocation((data: any) => {
            alert(JSON.stringify([data]))
            return { data: data }
=======
        MOMO.getLocation((data:any) => {
            // alert(JSON.stringify([data]))
            return {data:data}
>>>>>>> b1ada437284a4b4182fa444d41980c72238c254e
        })
    }
    showToast = (description:string,type:IToastType) => {
        MOMO.showToast({
            description: description,
            type: type,
            duration: 2000
        });
    }
}
export const momoApi = new MOMO_API();
export const momo = MOMO;
export default momoApi;
