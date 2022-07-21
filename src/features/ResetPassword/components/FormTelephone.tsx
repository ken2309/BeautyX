import React, { useContext } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import validateForm from '../../../utils/validateForm';
import icon from '../../../constants/icon';
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../../context/AppProvider';

function FormTelephone(props: any) {
    const { t } = useContext(AppContext);
    const { handlePostTelephone, title, load, isDialog } = props;
    const history = useHistory();
    const formikTelephone = useFormik({
        initialValues: {
            telephone: "",
        },
        validationSchema: Yup.object({
            telephone: Yup.string()
                .required(t("form.please_enter_your_phone"))
                .matches(validateForm.phone,
                    t("pm.phone_number")
                ),
        }),
        onSubmit: (values) => {
            handlePostTelephone(values.telephone)
        },
    });
    return (
        <>
            <div id="recaptcha-container" ></div>
            <div className="flex-row-sp for-pass-cnt__phone-head">
                {
                    !isDialog
                    &&
                    <button
                        onClick={() => history.goBack()}
                    >
                        <img src={icon.chevronLeft} alt="" />
                    </button>
                }
                <span>{title ? title : t("form.reset_password")}</span>
                <div></div>
            </div>
            <form
                autoComplete='off'
                className="flex-column for-pass-phone"
                onSubmit={formikTelephone.handleSubmit}
            >
                <input
                    name="telephone"
                    value={formikTelephone.values.telephone}
                    onChange={formikTelephone.handleChange}
                    type="text"
                    className="for-pass-cnt__phone-ip"
                    placeholder={t("pm.phone_number")}
                    autoFocus
                />
                {
                    formikTelephone.errors.telephone && formikTelephone.touched.telephone &&
                    <span className="for-pass-cnt__phone-err">
                        {formikTelephone.errors.telephone}
                    </span>
                }
                <button
                    className='for-pass-cnt__btn'
                    type='submit'
                >
                    {load ? t("form.sending") : t("form.continue")}
                </button>
            </form>
        </>
    );
}

export default FormTelephone;