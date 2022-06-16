// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
import React, { useContext } from "react";
import { AppContext } from "../../../../../context/AppProvider";
import { useSelector } from 'react-redux'
// import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";
import { useFormik } from 'formik';
import * as Yup from 'yup'

function Form(props: any) {
  const { t } = useContext(AppContext);
  const { USER } = useSelector((state: any) => state.USER);
  //console.log(USER)
  //const [value, setValue] = React.useState<Date | null>(new Date());

  const formik = useFormik({
    initialValues: {
      name: USER?.fullname,
      gmail: USER?.email,
      phone: USER?.telephone,
      sex: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Vui lòng nhập họ tên"),
      name: Yup.string()
        .min(2, "Tên lớn hơn 2 ký tự")
        .max(32, "Tên nhỏ hơn 32 ký tự")
        .required("Vui lòng nhập họ và tên"),
      // .matches(
      //   /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      //   "Tên không đúng định dạng"
      // ),
      // gmail: Yup.string()
      //   .required(t("form.please_enter_email"))
      //   .matches(
      //     // eslint-disable-next-line no-useless-escape
      //     /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i,
      //     t("form.email_format")
      //   ),
      // phone: Yup.string()
      //   .min(10, "Số điện thoại phải lớn hơn 10 chữ số")
      //   .max(11, "Số điện thoại phải nhỏ hơn 11 chữ số")
      //   .required("Vui lòng nhập số điện thoại"),
      // .matches(
      //   /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      //   "Số điện thoại không đúng định dạng"
      // ),
      // sex: Yup.string().required(t("form.please_choose_sex")),
    }),
    onSubmit: (values) => {
      // handleCloseContact();
    },
  });

  return (
    <div
    //onSubmit={formik.handleSubmit}
    //autoComplete="off"
    >
      <div className="title_section text-color-purple">
        <h1 className="title">{t("acc.my_profiles")}</h1>
        <span className="subtitle">{t("acc.update_acc")}</span>
      </div>
      <hr className="purple_line" />
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="form-account"
      >
        <div className="form-account__wraper">
          {/* name */}
          <div style={{ width: "100%" }}>
            <div className="form-account__label">
              <span>{t("pm.full_name")}</span>
            </div>
            <div className="form-account__wrapinput">
              <input
                className="form-account__input"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder={t("pm.full_name")}
                type="text"
                name="name"
                id="name"
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <p className="err-text">{formik.errors.name}</p>
            )}
          </div>
          {/* date of birth */}
          {/* <div style={{ width: "100%" }}>
            <div className="form-account__label">
              <span>{t("acc.dob")}</span>
            </div>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
            //locale={viVN}
            >
              <DatePicker
                className="cus-date__picker"
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
          </div> */}
          {/* sex */}
          {/* <div className="flex-column w-100">
            <div className="form-account__sex" style={{ padding: "0 0 8px 0" }}>
              <div className="form-account__label">
                <span>{t("acc.sex")}</span>
              </div>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="sex"
                  value={formik.values.sex}
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
            {formik.errors.sex && formik.touched.sex && (
              <p className="err-text cus-sex">{formik.errors.sex}</p>
            )}
          </div> */}
        </div>

        <div className="form-account__wraper">
          {/* email */}
          <div className="email-account" style={{ padding: "0 0 8px 0" }}>
            <div className="form-account__label">
              <span>Email</span>
            </div>
            <div className="form-account__wrapinput">
              <input
                disabled
                className="form-account__input"
                value={formik.values.gmail}
                onChange={formik.handleChange}
                placeholder="Email"
                type="text"
                name="gmail"
              />
            </div>
            {/* {formik.errors.gmail && formik.touched.gmail && (
              <p className="err-text">{formik.errors.gmail}</p>
            )} */}
          </div>
          {/* phone */}
          <div className="phone-account" style={{ padding: "0 0 8px 0" }}>
            <div className="form-account__label">
              <span>{t("pm.phone_number")}</span>
            </div>
            <div className="form-account__wrapinput">
              <input
                disabled
                className="form-account__input"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder={t("pm.phone_number")}
                type="text"
                name="phone"
              />
            </div>
            {/* {formik.errors.phone && formik.touched.phone && (
              <p className="err-text">{formik.errors.phone}</p>
            )} */}
          </div>
        </div>
        <button
          type="submit"
        >
          Lưu
        </button>
      </form>
    </div>
  );
}
export default Form;
