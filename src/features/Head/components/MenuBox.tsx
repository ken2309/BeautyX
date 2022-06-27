import React, { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import icon from "../../../constants/icon";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function MenuBox(props: any) {
  const history = useHistory();
  const { t } = useContext(AppContext);
  const USER = useSelector((state: any) => state.USER.USER)
  return (
    <ul>
      {USER ? (
        <>
          <li
            onClick={() => history.push("/tai-khoan/thong-tin-ca-nhan")}
            className="{menu.menuBoxItem}"
          >
            <div className="flex-row hd-menu__item">
              <img src={icon.User_purple} alt="" />
              <span className="hd-menu__item-text">{t("Header.my_acc")}</span>
            </div>
          </li>
          <li className="{menu.menuBoxItem}">
            <div className="flex-row hd-menu__item">
              <img src={icon.Credit_card} alt="" />
              <span className="hd-menu__item-text">
                {t("pm.payment_method")}
              </span>
            </div>
          </li>
          <li
            onClick={() => history.push("/tai-khoan/lich-su-mua")}
            className="{menu.menuBoxItem}"
          >
            <div className="flex-row hd-menu__item">
              <img src={icon.Clock_purple} alt="" />
              <span className="hd-menu__item-text">{t("Header.my_order")}</span>
            </div>
          </li>
          <li
            onClick={() => history.push("/lich-hen?tab=1")}
            className="{menu.menuBoxItem}"
          >
            <div className="flex-row hd-menu__item">
              <img src={icon.bag} alt="" />
              <span className="hd-menu__item-text">{t("Home.appointment")}</span>
            </div>
          </li>
          <li
            onClick={() => history.push("/lich-hen?tab=2")}
            className="{menu.menuBoxItem}"
          >
            <div className="flex-row hd-menu__item">
              <img src={icon.bag} alt="" />
              <span className="hd-menu__item-text">{t('app.my_services')}</span>
            </div>
          </li>
          <li onClick={() => history.push('/tai-khoan/ma-uu-dai')} className="{menu.menuBoxItem}">
            <div className="flex-row hd-menu__item">
              <img src={icon.Ticket} alt="" />
              <span className="hd-menu__item-text">{t("Header.my_codes")}</span>
            </div>
          </li>
          {/* <li className="{menu.menuBoxItem}">
            <div className="flex-row hd-menu__item">
              <img src={icon.Bell} alt="" />
              <span className="hd-menu__item-text">{t("cart.noti")}</span>
            </div>
          </li> */}
        </>
      ) : (
        ""
      )}
      {/* <li className="{menu.menuBoxItem}">
        <div className="flex-row-sp hd-menu__item">
          <div className="flex-row">
            <img src={icon.Setting} alt="" />
            <span className="hd-menu__item-text">{t("Header.settings")}</span>
          </div>
          <img src={icon.down} alt="" />
        </div>
      </li>
      <li className="">
        <div className="flex-row hd-menu__item">
          <img src={icon.Headphones_purple} alt="" />
          <span className="hd-menu__item-text">{t("Header.support")}</span>
        </div>
      </li> */}
    </ul>
  );
}

export default MenuBox;
