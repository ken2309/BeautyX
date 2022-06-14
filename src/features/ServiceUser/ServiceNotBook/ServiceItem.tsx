import { Checkbox } from "@mui/material";
import React, { useContext } from "react";
import icon from "../../../constants/icon";
import { AppContext } from "../../../context/AppProvider";
//import formatPrice from "../../../utils/formatPrice";
import { IUser_Service, IServiceSold } from '../../../interface/servicesUser';
import onErrorImg from "../../../utils/errorImg";
import { useSelector } from 'react-redux';
import { formatDate, checkTimeExpired } from "../../../utils/format";

interface IProps {
  service: IUser_Service,
  handleServiceBook: any,
  order_id: number
  service_sold: IServiceSold
}

function ServiceItem(props: IProps) {
  const { t } = useContext(AppContext);
  const {
    service,
    handleServiceBook,
    order_id,
    service_sold
  } = props;
  const servicesBookSlice = useSelector((state: any) => state.SERVICES_BOOK);
  const servicesBook = servicesBookSlice.servicesBook;
  const servicesBook_id = servicesBook.map((item: any) => item.ser_book_id);
  const dateExpired = checkTimeExpired(service?.time_expired)
  const handleAddService = () => {
    if (handleServiceBook && dateExpired === false) {
      handleServiceBook(service)
    }
  }
  return (
    <div>
      {
        service.remain_time === 0 &&
        <span className="treatment-ser-item__out" >
          Dịch vụ đã hết lượt
        </span>
      }
      {
        dateExpired &&
        <span className="treatment-ser-item__out" >
          Dịch vụ đã hết hạn
        </span>
      }
      <div
        style={
          service.remain_time === 0 || dateExpired ? { opacity: 0.6 } : {}
        }
        className="treatment-ser-item"
        onClick={handleAddService}
      >
        <Checkbox
          size='small'
          sx={{
            color: "#7161BA",
            "&.Mui-checked": {
              color: "#7161BA",
            },
            marginLeft: '-10px'
          }}
          checked={servicesBook_id.includes(parseInt(`${order_id}${service.id}`))}
        />
        <div className="treatment-ser-item__img">
          <img
            style={{ width: '100%', height: '100%' }}
            src={service.image && service?.image_url}
            onError={(e) => onErrorImg(e)}
            alt=""
          />
        </div>
        <div className="treatment-ser-item__cnt">
          <span className="ser-name">
            {service?.service_name}
          </span>
          {
            service.time_expired &&
            <p>Ngày hết hạn : {service.time_expired}</p>
          }
          <span className="ser-desc">
            {service.description !== null && service.description}
          </span>
          <div className="flex-row-sp">
            <div className="flex-row quantity">
              <img src={icon.DeskAlt} alt="" />
              <div className="quantity-text">
                <span>{t("my_ser.count_unused")}</span>
                {
                  service.unlimited === true ?
                    <span>Không giới hạn</span>
                    :
                    <span>{service.times - service.remain_time}/{service.times}</span>
                }
              </div>
            </div>
            {
              service?.time_expired?.slice(0, 5) > 0 &&
              <span className="date-time_expired">HSD:{formatDate(service?.time_expired)}</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceItem;
