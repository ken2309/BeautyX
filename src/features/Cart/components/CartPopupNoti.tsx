import React, { useState } from "react";
import { Dialog } from "@mui/material";
import icon from "../../../constants/icon";

function CartPopupNoti(props: any) {
  const { popUp, setPopUp, orgs, chooseOrg, chooseOrgClick } = props;
  const [showOrg, setShowOrg] = useState(false);
  const handleCancel = () => {
    setPopUp(false);
  };
  const handleToggleOrgBox = () => {
    setShowOrg(!showOrg);
  };
  const handleChooseOrg = (item: any) => {
    setShowOrg(false);
    setPopUp(false);
    if (chooseOrgClick) {
      chooseOrgClick(item);
    }
  };
  return (
    <Dialog
      open={popUp}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div
        style={showOrg === true ? { marginBottom: "500px" } : {}}
        className="flex-column cart-notification cart-dialog"
      >
        <div className="flex-row cart-notification__header">
          <img src={icon.warning} alt="" />
          <span>Lưu ý</span>
        </div>
        <p>
          Để thuận lơi cho khâu đặt hẹn, quý khách hàng chỉ được chọn thanh toán
          sản phẩm/dịch vụ trong cùng một doanh nghiệp
        </p>
        <div className="cart-notification__or">
          <div className="flex-row-sp cart-notification__or-box">
            <div className="cart-notification__or-box-dis">
              {chooseOrg ? chooseOrg : "Tên doanh nghiệp"}
            </div>
            <div
              onClick={handleToggleOrgBox}
              className="cart-notification__or-box-dr"
            >
              <img src={icon.arrowDown} alt="" />
            </div>
          </div>
          <div
            style={
              showOrg === false ? { display: "none" } : { display: "block" }
            }
            className="cart-notification__or-list cart-dialog_org-list"
          >
            <ul>
              <li onClick={() => handleChooseOrg(undefined)}>Tất cả</li>
              {orgs.map((item: any, index: number) => (
                <li
                  style={
                    item === chooseOrg
                      ? {
                          backgroundColor: "var(--purple)",
                          color: "var(--bg-gray)",
                        }
                      : {}
                  }
                  onClick={() => handleChooseOrg(item)}
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CartPopupNoti;
