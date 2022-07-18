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

// import { MOMO } from "./_momoImport";
class MOMO_API {
    requestUserConsents = () => {
        // MOMO.requestUserConsents(
        //     {
        //         permissions: [
        //             {
        //                 role: "name",
        //                 require: true,
        //             },
        //             {
        //                 role: "phone",
        //             },
        //             {
        //                 role: "email",
        //             },
        //             {
        //                 role: "gender",
        //             },
        //             {
        //                 role: "dateOfBirth",
        //             },
        //             {
        //                 role: "identify",
        //             },
        //         ],
        //     },
        //     (data: any, status: any) => {
        //         alert(JSON.stringify([data, status]));
        //     }
        // );
    };
    getUserConsents = () => {
        // MOMO.getUserConsents(
        //     {
        //         permissions: [
        //             {
        //                 role: "name",
        //             },
        //             {
        //                 role: "phone",
        //             },
        //             {
        //                 role: "email",
        //             },
        //         ],
        //     },
        //     (data: any) => {
        //         alert(JSON.stringify([data]));
        //     }
        // );
    };
    getLocation = () => {
        // MOMO.getLocation((data: any) => {
        //     alert(JSON.stringify([data]));
        // });
    };
}
export const momoApi = new MOMO_API();
// export const momo = MOMO;
export default momoApi;
