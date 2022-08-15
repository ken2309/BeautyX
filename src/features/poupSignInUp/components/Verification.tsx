import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import ButtonCus from "../../../components/ButtonCus";
interface IVerification {
  openVerification: any;
  setOpenNewPass: any;
  setOpenVerification: any;
}
export default function Verification(props: IVerification) {
  const { openVerification, setOpenNewPass, setOpenVerification } = props;
  // Close Popup Verification
  const handleCloseVerification = () => {
    setOpenVerification(false);
  };
  // Open Popup NewPass
  const handleClickOpenNewPass = () => {
    setOpenNewPass(true);
  };
  // Validate Form
  const formikVerification = useFormik({
    initialValues: {
      verification: "",
    },
    validationSchema: Yup.object({
      verification: Yup.string()
        .required("Vui lòng nhập mã xác nhận")
        .min(6, "Mã xác nhận lớn hơn 6 ký tự")
        .max(6, "Mã xác nhận nhỏ hơn 6 ký tự"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleCloseVerification();
      handleClickOpenNewPass();
    },
  });
  return (
    <div>
      <Dialog
        open={openVerification}
        keepMounted
        onClose={handleCloseVerification}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="dialog-forgot__password">
          <h2>Nhập mã xác nhận</h2>
          <p className="dialog-forgot__password-desc">
            Mã xác nhận đã được gửi về email/số điện thoại
          </p>
          <div className="sign-form__box">
            <input
              value={formikVerification.values.verification}
              onChange={formikVerification.handleChange}
              className="input-Verification"
              name="verification"
              id="verification"
              type="password"
            />
          </div>
          {formikVerification.errors.verification &&
            formikVerification.touched.verification && (
              <p className="err-text">
                {formikVerification.errors.verification}
              </p>
            )}
          <div className="dialog-forgot__password-btn">
            <ButtonCus
              onClick={handleCloseVerification}
              text="Trở lại"
              backColor="var(--bg-color)"
              color="var(--purple)"
              fontSize="20px"
              lineHeight="24px"
              borderRadius="20px"
            />
            <ButtonCus
              onClick={formikVerification.handleSubmit}
              text="Tiếp tục"
              backColor="var(--purple)"
              color="var(--bg-color)"
              fontSize="20px"
              lineHeight="24px"
              borderRadius="20px"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
