/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import ServiceCate from "./components/ServiceCate";
import ServiceCateMb from "./components/ServiceCateMb";
import ServiceList from "./components/ServiceList";
import "./serviceByMerchant.css";
import { useSelector, useDispatch } from "react-redux";
import { STATUS } from '../../redux/status';
import {
  fetchAsyncCateServices,
  fetchAsyncServices,
  clearServices
} from '../../redux/org_services/orgServivesSlice'

interface IProps {
  activeTab: number,
}

const tab_id = 2;
function ServiceByMerchant(props: IProps) {
  const { t } = useContext(AppContext);
  const dispatch = useDispatch();
  const { ORG, ORG_SERVICES } = useSelector((state: any) => state);
  const { SERVICES } = ORG_SERVICES;
  const { page } = SERVICES;
  const { org, status } = ORG;
  const { activeTab } = props;
  //const [searchTerm, setSearchTerm] = useState("");
  const [chooseCate, setChooseCate] = useState<any>();
  const callCategories = () => {
    if (status === STATUS.SUCCESS) {
      dispatch(fetchAsyncCateServices(org?.id))
    }
  }
  const callServices = () => {
    dispatch(clearServices())
    if (status === STATUS.SUCCESS) {
      const values = {
        cate_id: undefined,
        org_id: org?.id,
        page: page
      }
      dispatch(fetchAsyncServices(values))
    }
  }
  useEffect(() => {
    callCategories()
    callServices()
  }, [status])
  return (
    <div
      style={tab_id === activeTab ? { display: "block" } : { display: "none" }}
    >
      <div
        className="flex-row-sp ser-content"
        style={{ alignItems: "flex-start" }}
      >
        <ServiceCate
          chooseCate={chooseCate}
          setChooseCate={setChooseCate}
        />
        {/* for mobile */}
        <ServiceCateMb
          chooseCate={chooseCate}
          setChooseCate={setChooseCate}
        />
        <ServiceList
          t={t}
          cate_id={chooseCate}
          org={org}
        />
      </div>
    </div>
  );
}

export default ServiceByMerchant;
