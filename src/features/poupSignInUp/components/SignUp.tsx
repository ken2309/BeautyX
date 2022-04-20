import React, { useState } from "react";
import icon from "../../../constants/icon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { t } from "i18next";
import axios from "axios";
import { baseURL } from "../../../api/axios";
import { CircularProgress } from "@mui/material";
import validateForm from "../../../utils/validateForm";


function SignUp(props: any) {
  const { activeTabSign, setOpenSignIn } = props;
  const [typePass, setTypePass] = useState("password");
  const [loading, setLoading] = useState(false);
  const [errTelephone, setErrTelephone] = useState();
  const [errGmail, setErrGmail] = useState();
  const handleSignUp = (values: any) => {
    setLoading(true);
    const params = {
      fullname: values.Name,
      email: values.EmailPhone,
      telephone: values.Phone,
      password: values.password,
      platform: 'BEAUTYX'
    };
    // console.log("params :>> ", params);
    axios
      .post(`${baseURL}/auth/register`, params)
      .then(function (response) {
        setLoading(false);
        setOpenSignIn(false);
        // console.log("response :>> ", response);
      })
      .catch(function (err) {
        if (
          err.response.data.context.telephone ||
          err.response.data.context.email
        ) {
          setErrTelephone(err.response.data.context.telephone);
          setErrGmail(err.response.data.context.email);
        }
        setLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      Name: "",
      Sex: "",
      dateOfBirth: "",
      EmailPhone: "",
      password: "",
      confirmPassword: "",
      Phone: "",
      agree: false,
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .min(2, "Tên lớn hơn 2 ký tự")
        .required("Vui lòng nhập họ và tên")
        .matches(
          validateForm.fullname,
          "Tên không đúng định dạng"
        ),
      Sex: Yup.string().required("Vui lòng chọn giới tính"),
      EmailPhone: Yup.string()
        .required("Vui lòng nhập Email hoặc Số điện thoại")
        .matches(
          validateForm.email,
          "Vui lòng nhập đúng định dạng Example@gmail.com"
        ),
      Phone: Yup.string()
        .required(`${t("pm.please_enter")} ${t("pm.phone_number")}`)
        .matches(
          validateForm.phone,
          'Số điện thoại không đúng định dạng'
        ),

      password: Yup.string()
        .min(8, "Mật khẩu lớn hơn 8 ký tự")
        .max(32, "Mật khẩu tối đa 32 kí tự")
        .required("Vui lòng nhập mật khẩu"),
      confirmPassword: Yup.string()
        .required("Vui lòng xác nhận lại mật khẩu")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
      agree: Yup.boolean().oneOf(
        [true],
        "Vui lòng đọc và chấp nhận điều khoản"
      ),
    }),
    onSubmit: (values: any) => {
      handleSignUp(values);
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
        <div className="flex-column">
          <div className="flex-row w-100">
            <div className="sign-form__box ">
              <img className="sign-form__box-icon" src={icon.User} alt="" />
              <input
                value={formik.values.Name}
                onChange={formik.handleChange}
                name="Name"
                type="text"
                placeholder="Họ và tên"
              />
            </div>

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
                  label="Nam"
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
                  label="Nữ"
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
                  label="Khác"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="flex-row w-100">
            {formik.errors.Name && formik.touched.Name && (
              <p style={{ marginLeft: "20px" }} className="err-text">
                {formik.errors.Name}
              </p>
            )}
            {formik.errors.Sex && formik.touched.Sex && (
              <p style={{ marginLeft: "6px" }} className="err-text">
                {formik.errors.Sex}
              </p>
            )}
          </div>
        </div>

        {/* date of birth */}
        <div className="flex-column w-100">
          <div className="sign-form__box  mb-16 ">
            <img className="sign-form__box-icon" src={icon.Message} alt="" />
            <input
              value={formik.values.EmailPhone}
              onChange={formik.handleChange}
              name="EmailPhone"
              id="EmailPhone"
              type="text"
              placeholder="Email"
            />
          </div>
          {formik.errors.EmailPhone && formik.touched.EmailPhone && (
            <p className="err-text">{formik.errors.EmailPhone}</p>
          )}
          <p className="err-text">{errGmail}</p>
        </div>

        <div className="flex-column w-100">
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
          <p className="err-text">{errTelephone}</p>
        </div>

        <div className="flex-column w-100">
          <div className="sign-form__box mb-16">
            <img className="sign-form__box-icon" src={icon.Lock} alt="" />
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              //id="password"
              type={typePass}
              placeholder="Mật khẩu"
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

        <div className="flex-column w-100">
          <div className="sign-form__box mb-16">
            <img className="sign-form__box-icon" src={icon.Lock} alt="" />
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              name="confirmPassword"
              //id="confirmPassword"
              type={typePass}
              placeholder="Nhập lại mật khẩu"
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
        <div className="flex-row w-100">
          <Checkbox
            value={formik.values.agree}
            onChange={formik.handleChange}
            name="agree"
            //id="agree"
            // defaultChecked
            sx={{
              color: "#7161BA",
              "&.Mui-checked": {
                color: "#7161BA",
              },
            }}
          />
          <p className="sign-other-setup">
            Tôi đã đọc và đồng ý với
            <span>Điều khoản & Điều kiện của Myspa</span>
          </p>
        </div>
        {formik.errors.agree && formik.touched.agree && (
          <p style={{ margin: "0px 0px 0px 38px" }} className="err-text">
            {formik.errors.agree}
          </p>
        )}
        <button
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
        </button>

        <p className="sign-or">Hoặc đăng kí với</p>
        <div className="flex-row sign-other-social">
          <img src={icon.google} alt="" />
          <img src={icon.facebook} alt="" />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
