import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import React, { useContext } from "react";
import { AppContext } from "../../../../../context/AppProvider";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function Form(props: any) {
  const { t } = useContext(AppContext);
  const { formik } = props;
  // interface IDay {
  //   id: number;
  //   day: string;
  // }
  // interface IMonth {
  //   id: number;
  //   month: string;
  // }
  // interface IYear {
  //   id: number;
  //   year: string;
  // }

  // const [chooseDay, setChooseDay] = useState<IDay>({ id: 0, day: "1" });
  // const [chooseMonth, setChooseMonth] = useState<IMonth>({
  //   id: 0,
  //   month: "1",
  // });
  // const [chooseYear, setChooseYear] = useState<IYear>({ id: 0, year: "2001" });
  // const [openDay, setOpenDay] = useState(false);
  // const [openMonth, setOpenMonth] = useState(false);
  // const [openYear, setOpenYear] = useState(false);
  // const openDayClick = () => {
  //   if (openDay === true) {
  //     setOpenDay(false);
  //   } else {
  //     setOpenDay(true);
  //     setOpenMonth(false);
  //     setOpenYear(false);
  //   }
  // };
  // const openMonthClick = () => {
  //   if (openMonth === true) {
  //     setOpenMonth(false);
  //   } else {
  //     setOpenMonth(true);
  //     setOpenDay(false);
  //     setOpenYear(false);
  //   }
  // };
  // const openYearClick = () => {
  //   if (openYear === true) {
  //     setOpenYear(false);
  //   } else {
  //     setOpenYear(true);
  //     setOpenMonth(false);
  //     setOpenDay(false);
  //   }
  // };
  // const handleSetChooseDay = (day: any) => {
  //   setChooseDay(day);
  //   setOpenDay(false);
  // };
  // const handleSetChooseMonth = (month: any) => {
  //   setChooseMonth(month);
  //   setOpenMonth(false);
  // };
  // const handleSetChooseYear = (day: any) => {
  //   setChooseYear(day);
  //   setOpenYear(false);
  // };
  const [value, setValue] = React.useState<Date | null>(new Date());
  return (
    <form
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <div className="title_section text-color-purple">
        <h1 className="title">{t("acc.my_profiles")}</h1>
        <span className="subtitle">{t("acc.update_acc")}</span>
      </div>
      <hr className="purple_line" />

      <div className="form-account">
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
          <div style={{ width: "100%" }}>
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
          </div>
          {/* sex */}
          <div className="flex-column w-100">
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
          </div>
        </div>

        <div className="form-account__wraper">
          {/* email */}
          <div className="email-account" style={{ padding: "0 0 8px 0" }}>
            <div className="form-account__label">
              <span>Email</span>
            </div>
            <div className="form-account__wrapinput">
              <input
                className="form-account__input"
                value={formik.values.gmail}
                onChange={formik.handleChange}
                placeholder="Email"
                type="text"
                name="gmail"
                id="gmail"
              />
            </div>
            {formik.errors.gmail && formik.touched.gmail && (
              <p className="err-text">{formik.errors.gmail}</p>
            )}
          </div>
          {/* phone */}
          <div className="phone-account" style={{ padding: "0 0 8px 0" }}>
            <div className="form-account__label">
              <span>{t("pm.phone_number")}</span>
            </div>
            <div className="form-account__wrapinput">
              <input
                className="form-account__input"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder={t("pm.phone_number")}
                type="text"
                name="phone"
                id="phone"
              />
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <p className="err-text">{formik.errors.phone}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
export default Form;
