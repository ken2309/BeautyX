import React, { useContext } from "react";
import { Dialog } from "@mui/material";
import "./popupConfirm.css";
import ButtonCus from "../../components/ButtonCus";
import { AppContext } from "../../context/AppProvider";

function PopupConfirm(props: any) {
  const { t } = useContext(AppContext);
  const { openConfirm, setOpenConfirm, handleRemoveItemCart, title } = props;
  const handleCancel = () => {
    setOpenConfirm(false);
  };
  const handleAccept = () => {
    if (handleRemoveItemCart) {
      handleRemoveItemCart();
    }
    setOpenConfirm(false);
  };
  return (
    <Dialog
      open={openConfirm}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="flex-column pop-confirm">
        <p className="pop-confirm__head">{t("cart.noti")}</p>
        <span className="pop-confirm__title">
          {t("cart.do_you_want_to_remove")}
          <span style={{ fontWeight: "bold", color: "var(--purple)" }}>
            {" "}
            {title}{" "}
          </span>
          {t("cart.from_you_shopping_cart")} ?
        </span>
        <div className="flex-row-sp pop-confirm__title-btn">
          <ButtonCus
            text={t("cart.accept")}
            color="var(--bg-gray)"
            backColor="var(--purple)"
            border="solid 1px var(--purple)"
            borderRadius="16px"
            margin="0px 12px"
            onClick={handleAccept}
          />
          <ButtonCus
            text={t("cart.cancel")}
            color="var(--purple)"
            backColor="var(--bg-gray)"
            border="solid 1px var(--purple)"
            borderRadius="16px"
            margin="0px 12px"
            onClick={handleCancel}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default PopupConfirm;
