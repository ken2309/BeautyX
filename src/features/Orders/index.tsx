import React, { useContext, useEffect, useState } from "react";
import order from "../../api/orderApi";
import "./order.css";
import OrderItem from "./components/OrderItem";
import HeadTitle from "../HeadTitle";
import { AppContext } from "../../context/AppProvider";
import { IOrderV2 } from '../../interface/orderv2'


interface IData {
  orders: IOrderV2[],
  page: number,
  total: number
}

function Orders() {
  const { t } = useContext(AppContext);
  const [data, setData] = useState<IData>({
    orders: [],
    page: 1,
    total: 1
  })
  useEffect(() => {
    async function handleGetOrders() {
      try {
        const res = await order.getOrders(data.page);
        setData({
          ...data,
          orders: [...data.orders, ...res.data.context.data],
          total: res.data.context.total
        })
      } catch (err) {
        console.log(err);
      }
    }
    handleGetOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.page]);
  const onViewMore = () => {
    setData({
      ...data,
      page: data.page + 1
    })
  }

  return (
    <div className="order">
      <HeadTitle title={t("order.order_his")} />
      <div className="order-head">
        <span>{t("order.order_his")}</span>
      </div>
      <div className="order-list">
        <ul className="order-list__cnt">
          {
            data.orders.map((order: IOrderV2, index: number) => (
              <OrderItem
                key={index}
                order={order}
              />
            ))
          }
        </ul>
        {
          data.orders.length < data.total &&
          <div
            className="order__bot"
            onClick={onViewMore}
          >
            Xem thêm
          </div>
        }
      </div>
    </div>
  );
}

export default Orders;
