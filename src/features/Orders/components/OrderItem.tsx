import React, { useContext, useEffect, useState } from "react";
import formatPrice from "../../../utils/formatPrice";
import icon from "../../../constants/icon";
import { IOrganization } from "../../../interface/organization";
import orgApi from "../../../api/organizationApi";
import OrderDetail from "../../OrderDetail";
import { AppContext } from "../../../context/AppProvider";
import { IOrderV2 } from '../../../interface/orderv2';
import onErrorImg from "../../../utils/errorImg";

interface IProp {
  order: IOrderV2
}

function OrderItem(props: IProp) {
  const { t } = useContext(AppContext);
  const { order } = props;
  const countItem = order.items_count
  const [org, setOrg] = useState<IOrganization>();
  const [openDetail, setOpenDetail] = useState(false);
  useEffect(() => {
    async function getOrgById() {
      try {
        const response = await orgApi.getOrgById(order.organization_id);
        setOrg(response.data.context);
      } catch (error) {
        console.log(error);
      }
    }
    getOrgById();
  }, [order.organization_id]);
  const checkStatus = (status: string) => {
    switch (status) {
      case "CANCELED":
        return (
          <span style={{ color: "#EE6955" }} className="status">
            <img src={icon.orderCancel} alt="" /> {t("Home.cancel")}
          </span>
        );
      case "CANCELED_BY_USER":
        return (
          <span style={{ color: "#EE6955" }} className="status">
            <img src={icon.orderCancel} alt="" /> {t("Home.cancel")}
          </span>
        );
      case "PENDING":
        return (
          <span style={{ color: "#F9D646" }} className="status">
            <img src={icon.orderPending} alt="" /> {t("order.pending")}
          </span>
        );
      case "PAID":
        return (
          <span style={{ color: "#7FC128" }} className="status">
            <img src={icon.orderFinish} alt="" /> {t("order.complete")}
          </span>
        );
      default:
        break;
    }
  };
  // const gotoOrderDetail = () => {
  //       history.push({
  //             pathname: `/tai-khoan/chi-tiet-don-hang/${slugify(order.created_at)}`,
  //             state: {
  //                   org: org,
  //                   order: order,
  //                   countItem: countItem
  //             }
  //       })
  // }

  return (
    <>
      <li>
        <div className="order-item">
          <img
            className="order-item__img"
            src={org?.image_url}
            onError={(e) => onErrorImg(e)}
            alt=""
          />
          <div className="order-item__cnt">
            <div className="order-item__cnt-head">
              <span className="org-name">{org?.name}</span>
              <span className="org-address">{org?.full_address}</span>
              <div className="order-at">
                <span className="flex-row">
                  {t("booking.date")}:<h4>{order.created_at}</h4>
                </span>
              </div>
              <div className="order-item__cnt-count">{countItem} (items)</div>
            </div>
            <div className="flex-row-sp order-item__cnt-bot">
              <span className="order-item__count">
                {formatPrice(order.amount)} đ
              </span>
              <div className="flex-row order-item__status">
                {checkStatus(order.status)}
                <button onClick={() => setOpenDetail(true)}>
                  {t("app.details")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <OrderDetail
        open={openDetail}
        setOpen={setOpenDetail}
        org={org}
        order={order}
        countItem={countItem}
      />
    </>
  );
}

export default OrderItem;
