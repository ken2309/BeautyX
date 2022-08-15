import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../../rootComponents/flatForm";

export const extraPaymentMethodId = (payments_method: any[], chooseE_wall: any) => {
    const FLAT_FORM = EXTRA_FLAT_FORM();
    let payment_method_id;
    switch (FLAT_FORM) {
        case FLAT_FORM_TYPE.BEAUTYX:
            payment_method_id = chooseE_wall?.id
            // payment_method_id = 1
            break
        case FLAT_FORM_TYPE.MOMO:
            payment_method_id = payments_method.find((item: any) => item.name_key === FLAT_FORM_TYPE.MOMO)?.id
            break
        case FLAT_FORM_TYPE.TIKI:
            payment_method_id = payments_method.find((item: any) => item.name_key === FLAT_FORM_TYPE.TIKI)?.id
            break
        case FLAT_FORM_TYPE.MB:
            payment_method_id = payments_method.find((item: any) => item.name_key === FLAT_FORM_TYPE.MB)?.id
            break
        default:
            break
    }
    return payment_method_id
}