import React, { useContext, useEffect, useState } from "react";
import "./order.css";
import HeadTitle from "../HeadTitle";
import { AppContext } from "../../context/AppProvider";
import TabOrderCancel from './components/TabOrderCancel';
import TabOrderPaid from './components/TabOrderPaid';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { fetchAsyncOrderCancel, fetchAsyncOrderPaid } from "../../redux/order/orderSlice";
import { useDispatch } from "react-redux";


function Orders() {
  const { t } = useContext(AppContext);
  const dispatch = useDispatch();
  const [value, setValue] = useState("PAID")
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
              <Tab label="Đã hủy" value="CANCEL" />
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
