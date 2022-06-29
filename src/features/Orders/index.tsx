/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./order.css";
import HeadTitle from "../HeadTitle";
import { AppContext } from "../../context/AppProvider";
import TabOrderCancel from './components/TabOrderCancel';
import TabOrderPaid from './components/TabOrderPaid';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { fetchAsyncOrderCancel, fetchAsyncOrderPaid, onClearOrder } from "../../redux/order/orderSlice";
import { useDispatch } from "react-redux";
import { extraParamsUrl } from "../../utils/extraParamsUrl";


function Orders() {
  const { t } = useContext(AppContext);
  const dispatch = useDispatch();
  const [value, setValue] = useState("PAID")
  const params:any = extraParamsUrl();
  console.log(params)
  const onChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const callOrdersCancel = () => {
    dispatch(fetchAsyncOrderCancel({
      page: 1,
      // status: "PAID"
    }))
  }
  const callOrdersPaid = () => {
    dispatch(fetchAsyncOrderPaid({
      page: 1,
      status: "PAID"
    }))
  }
  useEffect(() => {
    dispatch(onClearOrder())
    callOrdersPaid()
    callOrdersCancel()
  }, [])


  return (
    <div className="order">
      <HeadTitle title={t("order.order_his")} />
      <div className="order-list">
        <div className="order-list-tab">
          <TabContext value={value}>
            <TabList
              onChange={onChangeTab}
            >
              <Tab label="Đã thanh toán" value="PAID" />
              <Tab label="Tất cả" value="CANCEL" />
            </TabList>
            <TabPanel value="PAID" >
              <TabOrderPaid />
            </TabPanel>
            <TabPanel value="CANCEL" >
              <TabOrderCancel />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  );
}

export default Orders;
