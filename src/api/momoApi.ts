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

import { MOMO } from './_momoImport';
class MOMO_API {
    requestUserConsents = () => {
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
                },
                {
                    "role": "gender"
                },
                {
                    "role": "dateOfBirth",
                },
                {
                    "role": "identify"
                },
            ]
        }, (data:any,status:any) => {
            alert(JSON.stringify([data,status]))
            return {data:data,status:status}
        })
    }
    getUserConsents = () => { 
        MOMO.getUserConsents({
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
        }, (data:any) => {
            alert(JSON.stringify([data]))
            return {data:data}
        })
    }
    getLocation = () => {
        MOMO.getLocation((data:any) => {
            alert(JSON.stringify([data]))
            return {data:data}
        })
    }
    showToast = () => {
        MOMO.showToast({
            description: "Successfully",
            type: "success",
            duration: 2000
        });
    }
}
export const momoApi = new MOMO_API();
export const momo = MOMO;
export default momoApi;
