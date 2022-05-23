// {
//     requestId: "1651717449170170821",
//     result: {
//       orderId: "179193577568534531",
//       status: "fail",
//       res: {
//         error: "Error",
//         errorMessage: "Request makePayment failed with message: payment_failure: user cancel payment"
//       }
//     }
//   }
const callbacks = {};
/**
 * @name makePayment
 * @description Post order id to tini app for makePayment().
 * @param {string} orderId 
 * 
 * @returns {string} hash
 */
export function doPostMakePaymentMessageTiki(params) {
    try {
        const requestId =
            new Date().getTime() +
            '' +
            Math.floor(Math.random() * 1000000);
        // eslint-disable-next-line no-undef
        my.postMessage({
            requestId: requestId,
            params: {
                api: 'makePayment',
                params: {
                    TYPE: params.TYPE,
                    response: params.params
                }
            },
            success: function () {
                alert('alo');
            }
        });
    } catch (e) {
        alert(e);
    }
}
/**
 * @name callApisFromTiki
 * @description Call api name from tini app.
 * @param {object}   {   api:'',params:{} } 
 * 
 * @returns {string} response
 */
export function callApiFromTiki(params, callback) {
    const requestId =
        new Date().getTime() +
        '' +
        Math.floor(Math.random() * 1000000);
    callbacks[requestId] = callback;
    // eslint-disable-next-line no-undef
    my.postMessage({
        requestId,
        params: {
            api: 'makePayment',
            params: {
                orderId: params
            }
        },
        success: function () {
            alert('alo');
        }
    });

}
export default doPostMakePaymentMessageTiki;