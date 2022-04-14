import React, { useState, useEffect } from "react";
import apointmentApi from "../../api/apointmentApi";
import { Dialog, Slide } from "@mui/material";
import "./appointment-detail.css";
import { TransitionProps } from "@mui/material/transitions";
import icon from "../../constants/icon";
import formatPrice from "../../utils/formatPrice";
import onErrorImg from "../../utils/errorImg";
import {Service} from '../../interface/service'

const view = window.screen.width;
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction={view < 768 ? "left" : "up"} ref={ref} {...props} />;
});

function AppointmentDetail(props: any) {
  const { openPopupDetail, setOpenPopupDetail, datingList, org } = props;
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    async function handleSetDetail() {
      try {
        const res = await apointmentApi.getAppointmentById(datingList.id);
        setServices(res?.data.context.services);
      } catch (error) {
        console.log(error);
      }
    }
    if (openPopupDetail === true) {
      handleSetDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datingList.id, openPopupDetail]);
  function handleClosePopupDetail() {
    setOpenPopupDetail(false);
  }
  return (
    <Dialog
      fullScreen={view < 768 ? true : false}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClosePopupDetail}
      open={openPopupDetail}
    >
      {openPopupDetail === true ? (
        <div className="app-de">
          <div className="app-de-header">
            <div className="flex-row-sp">
              <img
                onClick={handleClosePopupDetail}
                src={icon.pPrev_purple}
                alt=""
              />
              <span>Chi tiết lịch hẹn</span>
              <div style={{ width: "20px", height: "20px" }}></div>
            </div>
          </div>
          <div className="flex-row-sp app-de__head">
            <div className="flex-row app-de__head-status">
              <div className="flex-row app-de__head-status-it">
                <span></span>
                {datingList.status?.length === 0 ? "Chưa xác nhận": datingList.status}
              </div>
            </div>
            <div className="flex-row">
              <span className="flex-row app-de__head-date">
                Ngày: <h4>{datingList.date}</h4>
              </span>
              <span className="flex-row app-de__head-time">
                Giờ: <h4>{datingList.time_start}</h4>
              </span>
            </div>
          </div>
          <div className="app-de__ser">
            <span className="app-de__ser-head">
              Dịch vụ: ({services?.length} dịch vụ)
            </span>
            <ul className="app-de__ser-list">
              {services?.map((item: Service, index: number) => (
                <li key={index} className="app-de__ser-item">
                  <div className="item">
                    <img
                      src={item.image ? item?.image_url : org?.image_url}
                      onError={(e)=>onErrorImg(e)}
                      alt=""
                      className="item-img"
                    />
                    <div className="item-content">
                      <div className="item-content__name">
                        {item.service_name}
                      </div>
                      <div className="flex-row-sp item-count__price">
                        <span>
                          {formatPrice(item.special_price < 0 ? item.price : item.special_price)}
                          <u>đ</u>
                        </span>
                        <span>x1</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="app-de__address">
            <span className="app-de__ser-head">Địa chỉ</span>
            <div className="app-de__address-txt">
              {datingList.branch_id
                ? org.branches.find((i: any) => i.id === datingList.branch_id)?.full_address
                : org?.full_address}
            </div>
          </div>
          <div className="app-de__address">
            <span className="app-de__ser-head">Ghi chú</span>
            <div className="app-de__address-txt">{datingList.note}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Dialog>
  );
}

export default AppointmentDetail;
