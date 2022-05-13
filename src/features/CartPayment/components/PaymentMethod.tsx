import React, { useContext } from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import SectionTitle from "../../SectionTitle";
import { AppContext } from "../../../context/AppProvider";
import { IPaymentMethod } from "../../../interface/paymentMethod";


function PaymentMethod(props: any) {
  const { t } = useContext(AppContext);
  const { methodList, value, setValue, chooseE_wall, setChooseE_wall } = props;
  const handleChange = (event: any) => {
    setValue(event.target.value);
    setChooseE_wall();
  };
  return (
    <div>
      <SectionTitle title={t("pm.choose_payment_method")} />
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <ul className="payment-method">
          {methodList.map((item: any) => (
            <li className="flex-column" key={item.id}>
              <div className="flex-row payment-method-head">
                <FormControlLabel
                  value={item.method}
                  control={
                    <Radio
                      sx={{ "&.Mui-checked": { color: "var(--purple)" } }}
                    />
                  }
                  label={item.title}
                />
                <img src={item.img} alt="" />
              </div>
              <div
                style={
                  value === item.method
                    ? { display: "block" }
                    : { display: "none" }
                }
                className="pm-method_child"
              >
                <ul>
                  {item.method_list?.filter((item: IPaymentMethod) => item.name_key === "MOMO")
                    .map((item: IPaymentMethod) => (
                      <li
                        className="pm-method_child-item"
                        key={item.id}
                        onClick={() => setChooseE_wall(item)}
                      >
                        <div
                          className="pm-method_child-item_box"
                          style={
                            chooseE_wall === item
                              ? {
                                backgroundColor: "#7161BA",
                                color: "white",
                              }
                              : {
                                backgroundColor: "",
                                color: "#7161BA",
                              }
                          }
                        >
                          {/* {chooseE_wall === item ? (
                          <img src={icon.success} alt="" />
                        ) : (
                          ""
                        )} */}
                          {item.name_key}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </RadioGroup>
    </div>
  );
}

export default PaymentMethod;
