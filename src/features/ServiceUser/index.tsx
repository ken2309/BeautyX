import React, { useState, useContext } from "react";
import Head from "../Head";
import { Container } from "@mui/material";
import icon from "../../constants/icon";
//import DatePicker from '../../components/DatePicker';
//import TimePicker from '../../components/TimePicker';
import myServices from "../../data/listMyServices";
import "./mySer.css";
import OrgSelect from "./components/OrgSelect";
import ServiceBook from "./components/ServiceBook";
import { IOrganization } from "../../interface/organization";
import PopupNoti from "./components/PopupNoti";
import ServiceBottom from "./components/ServiceBottom";
import Footer from "../Footer";
import { AppContext } from "../../context/AppProvider";
import HeadTitle from "../HeadTitle";

function ServicesUser(props: any) {
  const { setOpen } = props;
  const { t } = useContext(AppContext);
  const [chooseOrg, setChooseOrg] = useState(0);
  const [orgAll, setOrgAll] = useState<IOrganization[]>([]);
  const [openNoti, setOpenNoti] = useState(true);
  const [servicesBook, setServicesBook] = useState([]);
  //mb
  const [drop, setDrop] = useState(false);
  const dropClick = () => {
    setDrop(!drop);
  };
  const headerTitle = "Gói dịch vụ";
  return (
    <>
      <HeadTitle title={headerTitle} />
      <Head setCloseDialog={setOpen} />
      <Container>
        <div className="flex-row-sp my-ser">
          <div
            style={
              drop === true
                ? { height: "max-content", transition: "all .3s" }
                : { transition: "all .3s" }
            }
            className="my-ser__left"
          >
            <span className="flex-row my-ser__left-title">
              <img src={icon.dashboard} alt="" />
              {t("my_ser.business")}
              <img
                onClick={dropClick}
                src={icon.chevronRight}
                alt=""
                className="my-ser__left_drop"
              />
            </span>
            <OrgSelect
              chooseOrg={chooseOrg}
              setChooseOrg={setChooseOrg}
              setOrgAll={setOrgAll}
              myServices={myServices}
              servicesBook={servicesBook}
              setServicesBook={setServicesBook}
            />
          </div>
          <div className="my-ser__right">
            <ServiceBook
              chooseOrg={chooseOrg}
              orgAll={orgAll}
              servicesBook={servicesBook}
              setServicesBook={setServicesBook}
            />
          </div>
        </div>
      </Container>
      <ServiceBottom
        orgAll={orgAll}
        servicesBook={servicesBook}
        setOpenNoti={setOpenNoti}
      />
      <Footer />
      <PopupNoti open={openNoti} setOpen={setOpenNoti} />
    </>
  );
}

export default ServicesUser;
