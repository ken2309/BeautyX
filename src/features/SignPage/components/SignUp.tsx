import React, { useContext, useState } from "react";
import icon from "../../../constants/icon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { AppContext } from "../../../context/AppProvider";
import PopupNoti from "./PopupNoti";
import auth from "../../../api/authApi";
function SignUp(props: any) {
  const { activeTabSign, setActiveTabSign } = props;
  const { t } = useContext(AppContext);
  const [typePass, setTypePass] = useState("password");
  const [error, setError] = useState();
  const [, setErrMail] = useState();
  const [popup, setPopup] = useState(false);
  async function submitRegisterForm(user: any) {
    try {
      await auth.register(user);
      setPopup(true);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setError(err.response.data.context.telephone);
        setErrMail(err.response.data.context.email);
      }
    }
  }
  const handleOnSubmitSignUp = (values: any) => {
    const params = {
      fullname: values.Name,
      email: values.EmailPhone,
      telephone: values.Phone,
      password: values.password,
      platform:"BEAUTYX"
    };
    console.log(params)
    submitRegisterForm(params);
    //setPopup(true)
    // axios
    //   .post(`${baseURL}/auth/register`, params)
    //   .then(function (response) {
    //     setLoading(false);
    //     setPopup(true);
    //   })
    //   .catch(function (err) {
    //     if (
    //       err.response.data.context.telephone ||
    //       err.response.data.context.email
    //     ) {
    //       setError(err.response.data.context.telephone);
    //       setErrMail(err.response.data.context.email);
    //     }
    //     setLoading(false);
    //   });
  };
  // console.log(error, errMail);

  const formik = useFormik({
    initialValues: {
      Name: "",
      Sex: "",
      dateOfBirth: "",
      EmailPhone: "",
      Phone: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .min(2, "Tên lớn hơn 2 ký tự")
        .required(t("form.please_enter_full_name"))
        .matches(
          /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
          "Tên không đúng định dạng"
        ),
      Sex: Yup.string().required(t("form.please_choose_sex")),
      // dateOfBirth: Yup.string()
      //   .required(t("form.please_enter_dob"))
      //   .matches(
      //     // eslint-disable-next-line no-useless-escape
      //     /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
      //     t("form.dob_format")
      //   ),
      EmailPhone: Yup.string()
        .required(t("form.please_enter_email"))
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i,
          t("form.email_format")
        ),
      Phone: Yup.string().required(
        `${t("pm.please_enter")} ${t("pm.phone_number")}`
      ),
      password: Yup.string()
        .min(8, t("form.password_min"))
        .max(32, t("form.password_max"))
        .required(t("Home.Sign_val_password")),
      // .matches(
      //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      //   t("form.password_rule")
      // ),
      confirmPassword: Yup.string()
        .required(t("form.please_confirm_password"))
        .oneOf([Yup.ref("password"), null], t("form.password_confirm_invalid")),
      // agree: Yup.boolean().oneOf(
      //   [true],
      //   "Vui lòng đọc và chấp nhận điều khoản"
      // ),
    }),
    onSubmit: (values: any) => {
      handleOnSubmitSignUp(values);
      console.log(values)
    },
  });
  return (
    <div
      style={activeTabSign === 2 ? { display: "block" } : { display: "none" }}
    >
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="flex-column sign-form"
      >
        {/* name & sex */}
        <div className="flex-column" style={{ width: "100%" }}>
          <div
            className="flex-row w-100 sign-input-name"
            style={{ width: "100%" }}
          >
            <div className="sign-form__box ">
              <img className="sign-form__box-icon" src={icon.User} alt="" />
              <input
                value={formik.values.Name}
                onChange={formik.handleChange}
                name="Name"
                type="text"
                placeholder={t("pm.full_name")}
              />
            </div>

            {/* check box sex */}
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="Sex"
                value={formik.values.Sex}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: "#7161BA",
                        "&.Mui-checked": {
                          color: "#7161BA",
                        },
                      }}
                    />
                  }
                  label={t("form.male")}
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: "#7161BA",
                        "&.Mui-checked": {
                          color: "#7161BA",
                        },
                      }}
                    />
                  }
                  label={t("form.female")}
                />
                <FormControlLabel
                  value="other"
                  control={
                    <Radio
                      sx={{
                        color: "#7161BA",
                        "&.Mui-checked": {
                          color: "#7161BA",
                        },
                      }}
                    />
                  }
                  label={t("form.other")}
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div style={{ width: "100%" }} className="flex-row w-100">
            {formik.errors.Name && formik.touched.Name && (
              <p style={{ margin: " 0 0 0 20px" }} className="err-text">
                {formik.errors.Name}
              </p>
            )}
            {formik.errors.Sex && formik.touched.Sex && (
              <p style={{ margin: " 0 0 0 6px" }} className="err-text">
                {formik.errors.Sex}
              </p>
            )}
          </div>
        </div>

        {/* date of birth */}
        {/* <div className="date-of-birth">
          <div className="relative" style={{ width: "100%", margin: "8px 0" }}>
            <img
              style={{ zIndex: "10" }}
              className="sign-form__box-icon"
              src={icon.Calendar}
              alt=""
            />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              //locale={viVN}
            >
              <DatePicker
                // className="cus-date__picker"
                openTo="year"
                views={["year", "month", "day"]}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
          </div>
        </div> */}

        {/* phone */}
        <div className="flex-column w-100" style={{ width: "100%" }}>
          <div className="sign-form__box  mb-16 ">
            <img className="sign-form__box-icon" src={icon.Message} alt="" />
            <input
              value={formik.values.Phone}
              onChange={formik.handleChange}
              name="Phone"
              id="Phone"
              type="text"
              placeholder={t("pm.phone_number")}
            />
          </div>
          {formik.errors.Phone && formik.touched.Phone && (
            <p className="err-text">{formik.errors.Phone}</p>
          )}
          <p className="err-text">{error}</p>
        </div>

        {/* password */}
        <div className="flex-column w-100" style={{ width: "100%" }}>
          <div className="sign-form__box mb-16">
            <img className="sign-form__box-icon" src={icon.Lock} alt="" />
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              id="password"
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
          {formik.errors.password && formik.touched.password && (
            <p className="err-text">{formik.errors.password}</p>
          )}
        </div>

        {/* confirm password */}
        <div className="flex-column w-100" style={{ width: "100%" }}>
          <div className="sign-form__box mb-16">
            <img className="sign-form__box-icon" src={icon.Lock} alt="" />
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              name="confirmPassword"
              id="confirmPassword"
              type={typePass}
              placeholder={t("form.confirm_password")}
            />
            <img
              onMouseEnter={() => setTypePass("text")}
              onMouseLeave={() => setTypePass("password")}
              className="sign-form__box-icon-show"
              src={icon.eye}
              alt=""
            />
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="err-text">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* checkbox */}
        {/* <div className="flex-row w-100">
          <Checkbox
            onChange={formik.handleChange}
            value={formik.values.agree}
            name="agree"
            id="agree"
            sx={{
              color: "#7161BA",
              "&.Mui-checked": {
                color: "#7161BA",
              },
            }}
          />

          <p className="sign-other-setup">
            {t("form.i_agree")}
            <span>{t("form.myspa_s_terms")}</span>
          </p>
        </div>
        {formik.errors.agree && formik.touched.agree && (
          <p className="err-text" style={{ margin: "0 0 0 36px" }}>
            {formik.errors.agree}
          </p>
        )} */}

        {/* button submit */}
        <button
          type="submit"
        >
          Đăng ký
        </button>
        {/* <button
          // disabled={agree === true ? false : true}
          type="submit"
          className="sign-btn mt-38"
          style={
            loading === true ? { position: "relative", opacity: "0.6" } : {}
          }
        >
          {loading === true ? (
            <div className="sign-loading">
              <CircularProgress size="25px" color="inherit" />
            </div>
          ) : (
            ""
          )}
          {t("Home.Sign_up")}
        </button> */}

        <p className="sign-or">{t("Home.Sign_or")}</p>
        <div className="flex-row sign-other-social">
          <img src={icon.google} alt="" />
          <img src={icon.facebook} alt="" />
        </div>
      </form>

      <PopupNoti
        popup={popup}
        setPopup={setPopup}
        isSignIn={false}
        setActiveTabSign={setActiveTabSign}
      />
    </div>
  );
}

export default SignUp;
