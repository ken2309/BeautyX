import { Checkbox } from "@mui/material";
import React, { useContext } from "react";
import icon from "../../../constants/icon";
import { AppContext } from "../../../context/AppProvider";
//import formatPrice from "../../../utils/formatPrice";
import { IUser_Service } from '../../../interface/servicesUser';
import onErrorImg from "../../../utils/errorImg";
import { useSelector } from 'react-redux';

interface IProps {
  service: IUser_Service,
  handleServiceBook: any,
  order_id: number
}

function ServiceItem(props: IProps) {
  const { t } = useContext(AppContext);
  const { service, handleServiceBook, order_id } = props;
  const servicesBookSlice = useSelector((state: any) => state.SERVICES_BOOK);
  const servicesBook = servicesBookSlice.servicesBook;
  const servicesBook_id = servicesBook.map((item: any) => item.ser_book_id);
  const handleAddService = () => {
    // check service has order_id same
    if (handleServiceBook) {
      handleServiceBook(service)
    }
  }


  return (
    <>
      <div
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
          <span className="ser-desc">
            {service.description !== null && service.description}
          </span>
          <div className="flex-row quantity">
            <img src={icon.DeskAlt} alt="" />
            <div className="quantity-text">
              <span>{t("my_ser.count_unused")}</span>
              <span>{service.times-service.remain_time}/{service.times}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceItem;
