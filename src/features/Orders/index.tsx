import React, { useContext, useState } from "react";
import "./order.css";
import HeadTitle from "../HeadTitle";
import { AppContext } from "../../context/AppProvider";
import TabOrderCancel from './components/TabOrderCancel';
import TabOrderPaid from './components/TabOrderPaid';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';


function Orders() {
  const { t } = useContext(AppContext);
  const [value, setValue] = useState("PAID")
  const onChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

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
