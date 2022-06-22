import React, { useEffect, useState, useContext } from "react";
import Organization from "../../../../api/organizationApi";
import { IBranch } from "../../../../interface/branch";
import { IOrganization } from "../../../../interface/organization";
import { AppContext } from "../../../../context/AppProvider";
//import CalendarPopupDetail from "./CalendarPopupDetail";
import AppointmentDetail from "../../../AppointmentDetail/index";
import { STATUS } from '../../../../utils/statusApp'
import useFullScreen from "../../../../utils/useFullScreen";

export default function HomeLoggedCalendarAppointmentItem(props: any) {
  const { t } = useContext(AppContext);
  const IS_MB = useFullScreen();
  const { datingList } = props;
  console.log(datingList)
  const [org, setOrg] = useState<IOrganization>();
  const [branch, setBranch] = useState<IBranch>();
  const [openPopupDetail, setOpenPopupDetail] = useState(false);

  function handleOpenPopupDetail() {
    setOpenPopupDetail(true);
  }
  useEffect(() => {
    async function handleGetOrg_Br() {
      try {
        const res = await Organization.getOrgBrById({ id: datingList.org_id });
        const data = await res.data.context;
        setOrg(data);
        setBranch(
          data.branches.find((item: any) => item.id === datingList.branch_id)
        );
      } catch (error) {
        console.log(error);
      }
    }
    handleGetOrg_Br();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datingList.org_id]);
  // console.log(`org`, org);
  // console.log(`branch`, branch);
  const checkdotstt = (stt: any) => {
    switch (stt) {
      case STATUS.ARRIVED:
        return <span className="appointment-status status-dot-green" />;
      case STATUS.CONFIRMED:
        return <span className="appointment-status status-dot-blue" />;
      case STATUS.DONE:
        return <span className="appointment-status status-dot-pink" />;
      case STATUS.CANCEL:
        return <span className="appointment-status status-dot-red" />;
      default:
        return <span className="appointment-status status-dot-red" />;
    }
  };
  return (
    <div>
      <div className="calendar-appointment__item">
        <div className="calendar-appointment__item-row">
          {!IS_MB && checkdotstt(datingList.status)}
          <div className="appointment-item-time-mb">
            <div className="flex-column container">
              <span className="time">{datingList.time_start}</span>
              {/* <span className="day-week">Thứ 5</span> */}
              <span className="day">{datingList.date}</span>
            </div>
          </div>
          <div className="calendar-appointment__item-column">
            <div className="calendar-appointment__item-time">
              <p>{datingList.time_start}</p>
              <p>{"-"}</p>
              <p>{datingList.time_end}</p>
            </div>
            <p className="calendar-appointment__item-name">{org?.name}</p>
            <p className="calendar-appointment__item-address">
              {branch ? branch.full_address : org?.full_address}
            </p>
            <div className="flex-row">
              {
                IS_MB && <button
                  onClick={handleOpenPopupDetail}
                  className="calendar-appointment__item-detail"
                >
                  Quét mã QR
                </button>
              }
              <button
                onClick={handleOpenPopupDetail}
                className="calendar-appointment__item-detail"
              >
                {t("app.details")} {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AppointmentDetail
        org={org}
        branch={branch}
        datingList={datingList}
        openPopupDetail={openPopupDetail}
        setOpenPopupDetail={setOpenPopupDetail}
      />
    </div>
  );
}
