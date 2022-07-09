import React, { useContext } from "react";
import icon from "../../constants/icon";
import { AppContext } from "../../context/AppProvider";

export default function HomeLoggedCalendarStatus() {
  const { t } = useContext(AppContext);
  const statusList = [
    { title: t("Home.confirmed"), icon: icon.Exclude },
    { title: t("Home.unconfimred"), icon: icon.Exclude2 },
    { title: t("Home.complete"), icon: icon.Exclude3 },
    { title: t("Home.cancel"), icon: icon.Exclude4 },
  ]
  return (
    <div className="calendar-status">
      <span className="calendar-status__title">
        {t("Home.appointment_status")}
      </span>
      <ul className="calendar-status__list">
        {
          statusList.map((item, index) => (
            <li key={index} className="calendar-status__item">
              <img src={item.icon} alt="" />
              <span>{item.title}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
