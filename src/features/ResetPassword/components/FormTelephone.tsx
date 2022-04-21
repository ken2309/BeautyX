import React from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import validateForm from '../../../utils/validateForm';
import icon from '../../../constants/icon';
import { useHistory } from 'react-router-dom'

function FormTelephone(props: any) {
    const { handlePostTelephone, title } = props;
    const history = useHistory();
    const formikTelephone = useFormik({
        initialValues: {
            telephone: "",
        },
        validationSchema: Yup.object({
            telephone: Yup.string()
                .required("Vui lòng nhập Số điện thoại")
                .matches(validateForm.phone,
                    "Vui lòng nhập đúng số điện thoại"
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
                <button
                    onClick={() => history.goBack()}
                >
                    <img src={icon.chevronLeft} alt="" />
                </button>
                <span>{title ? title : 'Đặt lại mật khẩu'}</span>
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
                    placeholder='Số điện thoại'
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
                    Tiếp theo
                </button>
            </form>
        </>
    );
}

export default FormTelephone;