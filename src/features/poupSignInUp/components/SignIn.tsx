import React, { useContext, useState } from "react";
import icon from "../../../constants/icon";
import { Checkbox } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import auth from "../../../api/authApi";
import { AppContext } from "../../../context/AppProvider";
import PopupNoti from "../../SignPage/components/PopupNoti";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";

function SignIn(props: any) {
    const { t, setSign } = useContext(AppContext);
    const history = useHistory();
    const { activeTabSign, setActiveTabSign, setOpenSignIn, useForSignRes } =
        props;
    const [typePass, setTypePass] = useState("password");
    const [loading, setLoading] = useState(false);
    const [errPass, setErrPass] = useState("");
    const [display_email, setDisplay_email] = useState("");
    const [popup, setPopup] = useState(false);
    async function submitLogin(values: any) {
        try {
            const response = await auth.login(values);
            localStorage.setItem(
                "_WEB_US",
                JSON.stringify(response.data.context)
            );
            localStorage.setItem("_WEB_TK", response.data.context.token);
            setSign(true);
            if (useForSignRes === true) {
                history.goBack();
            } else {
                setOpenSignIn(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const err = error as AxiosError;
            switch (err.response?.status) {
                case 401:
                    return setErrPass(
                        "Mật khẩu chưa chính xác. Vui lòng thử lại !"
                    );
                case 404:
                    return setPopup(true);
                default:
                    break;
            }
        }
    }
    const handleLogin = (values: any) => {
        setLoading(true);
        setDisplay_email(values.email);
        submitLogin(values);
    };
    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Vui lòng nhập email/số điện thoại"),
            password: Yup.string()
                .min(6, "Mật khẩu lớn hơn 8 ký tự")
                .required("Vui lòng nhập mật khẩu"),
            // .matches(
            //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            //   "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 số và 1 ký tự chữ 1 đặc biệt"
            // ),
        }),
        //SUBMIT LOGIN FORM
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    return (
        <div
            style={
                activeTabSign === 1 ? { display: "block" } : { display: "none" }
            }
        >
            <form
                onSubmit={formikLogin.handleSubmit}
                autoComplete="off"
                className="flex-column sign-form"
            >
                <div className="sign-form__box">
                    <img
                        className="sign-form__box-icon"
                        src={icon.User}
                        alt=""
                    />
                    <input
                        name="email"
                        value={formikLogin.values.email}
                        onChange={formikLogin.handleChange}
                        type="text"
                        placeholder={t("Home.Sign_in_pl_user_name")}
                    />
                </div>
                {formikLogin.errors.email && formikLogin.touched.email && (
                    <p className="err-text">{formikLogin.errors.email}</p>
                )}
                <div className="sign-form__box">
                    <img
                        className="sign-form__box-icon"
                        src={icon.Lock}
                        alt=""
                    />
                    <input
                        name="password"
                        value={formikLogin.values.password}
                        onChange={formikLogin.handleChange}
                        type={typePass}
                        placeholder={t("Home.Sign_in_pl_password")}
                    />
                    <img
                        onMouseEnter={() => setTypePass("text")}
                        onMouseLeave={() => setTypePass("password")}
                        className="sign-form__box-icon-show"
                        src={icon.eye}
                        alt=""
                    />
                </div>
                {formikLogin.errors.password &&
                    formikLogin.touched.password && (
                        <p className="err-text">
                            {formikLogin.errors.password}
                        </p>
                    )}
                <p className="err-text">{errPass}</p>
                <div className="signIn-checkbox sign-check">
                    <div className="signIn-checkbox__wrap">
                        <Checkbox
                            defaultChecked
                            sx={{
                                color: "#7161BA",
                                "&.Mui-checked": {
                                    color: "#7161BA",
                                },
                            }}
                        />
                        <span>{t("Home.Sign_remember")}</span>
                    </div>
                    <span onClick={() => history.push("/doi-mat-khau")}>
                        {t("Home.Sign_forgot")} ?
                    </span>
                </div>
                <button
                    disabled={loading === true ? true : false}
                    type="submit"
                    className="sign-btn"
                    style={
                        loading === true
                            ? { position: "relative", opacity: "0.6" }
                            : {}
                    }
                >
                    {loading === true ? (
                        <div className="sign-loading">
                            <CircularProgress size="25px" color="inherit" />
                        </div>
                    ) : (
                        <></>
                    )}
                    {loading === true ? (
                        <div className="sign-loading">
                            <CircularProgress size="25px" color="inherit" />
                        </div>
                    ) : (
                        ""
                    )}
                    {t("Home.Sign_in")}
                </button>
            </form>
            <p className="sign-or">{t("Home.Sign_or")}</p>
            <div className="flex-row sign-other-social">
                <img src={icon.google} alt="" />
                <img src={icon.facebook} alt="" />
            </div>
            <p className="sign-other-setup">
                Bạn chưa có tài khoản
                <span onClick={() => setActiveTabSign(2)}>Đăng ký ngay</span>
            </p>
            {/* Dialog ForgotPass */}
            <PopupNoti
                popup={popup}
                setPopup={setPopup}
                isSignIn={true}
                title={`Emai "${display_email}" ${t("form.is_not_registered")}`}
            />
        </div>
    );
}

export default SignIn;
