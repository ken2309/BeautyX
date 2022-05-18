import React, { useContext, useState } from "react";
import { Container } from "@mui/material";
import ButtonCus from "../../../components/ButtonCus";
import icon from "../../../constants/icon";
import OrgBranch from "./OrgBranch";
import OrgDate from "./OrgDate";
import OrgTime from "./OrgTime";
import apointmentApi from "../../../api/apointmentApi";
import PopupNotiApp from "./PopupNotiApp";
import { AxiosError } from "axios";
import { AppContext } from "../../../context/AppProvider";
import { useSelector, useDispatch } from 'react-redux';
import { IOrganization } from '../../../interface/organization';
import onErrorImg from "../../../utils/errorImg";
import ButtonLoading from "../../../components/ButtonLoading";
import { pickBy, identity } from 'lodash';
import { clearAllServices } from '../../../redux/servicesBookSlice'


interface IServiceBook {
  description: string,
  duration: number,
  id: number,
  image: string,
  image_url: string,
  order_id: number,
  org: IOrganization
  org_id: number,
  remain_time: number,
  ser_book_id: number
  service_name: string
  time_expired: any,
  times: number | null,
  unlimited: boolean
}
interface IDataBook {
  branch: any,
  date: any,
  time: any,
  note: string
}

function ServiceBottom(props: any) {
  const { t } = useContext(AppContext);
  const dispatch = useDispatch();
  const [openNext, setOpenNext] = useState(false);
  const servicesBookSlice = useSelector((state: any) => state.SERVICES_BOOK);
  const servicesBook = servicesBookSlice.servicesBook
  const org = servicesBookSlice.org;
  const order_id = servicesBookSlice?.order_id
  const branches = org?.branches
  const [open, setOpen] = useState({
    oBranch: false,
    oDate: false,
    oTime: false
  })

  const [dataBook, setDataBook] = useState<IDataBook>({
    branch: null,
    date: null,
    time: null,
    note: ''
  })
  const [openNotiApp, setOpenNotiApp] = useState(false);
  const [errCode, setErrCode] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    if (servicesBook.length > 0) {
      setOpenNext(!openNext);
      setDataBook({
        branch: null,
        date: null,
        time: null,
        note: ''
      })
    }
  };
  const openBranchesClick = () => {
    setOpen({
      oBranch: !open.oBranch,
      oDate: false,
      oTime: false
    })
  };
  const openDateClick = () => {
    setOpen({ oDate: !open.oDate, oBranch: false, oTime: false })
  };
  const openTimeClick = () => {
    setOpen({ oTime: !open.oTime, oBranch: false, oDate: false })
  };
  //handle submit appointment
  async function handleSubmitAppApi(params: any, org_id: any) {
    setLoading(true)
    try {
      await apointmentApi.postAppointment(params, org_id);
      setOpenNext(false)
      setOpenNotiApp(true);
      setErrCode(200);
      setLoading(false)
      dispatch(clearAllServices())
    } catch (error) {
      setOpenNotiApp(true);
      setLoading(false)
      const err = error as AxiosError;
      setErrCode(err.response?.status);
    }
  }
  const handleSubmitApp = () => {
    const timeStart = `${dataBook.date} ${dataBook.time}:00`;
    const service_ids = servicesBook.map((item: any) => item.id);

    const a = {
      order_id: order_id,
      service_ids: service_ids,
      branch_id: dataBook.branch?.id,
      time_start: timeStart,
      note: dataBook.note
    }
    if (order_id && dataBook.date && dataBook.time) {
      const params = pickBy(a, identity)
      handleSubmitAppApi(params, org?.id)
    }
  };
  return (
    <div
      className={openNext === true ? "my-ser-bot my-ser-bot__up" : "my-ser-bot"}
    >
      <Container>
        <div className="my-ser-bot__cnt">
          <span className="my-ser-bot__cnt-count">
            {t("my_ser.selected")}
            {servicesBook.length}
            {t("my_ser.service")}
          </span>
          <ButtonCus
            imgIcon={
              openNext === true ? icon.chevronDownWhite : icon.chevronUpWhite
            }
            text={openNext === true ? t("my_ser.close") : t("my_ser.continue")}
            color="var(--bgWhite)"
            backColor="var(--purple)"
            padding="8px 16px"
            borderRadius="16px"
            margin="0px 0px 0px 12px"
            opacity={servicesBook.length > 0 ? "1" : ".3"}
            onClick={handleNextStep}
          />
        </div>
        <div className="flex-row-sp my-ser-bot__check">
          <div className="my-ser-bot__check-left">
            <div className="title">{t("my_ser.services_selected")}</div>
            <div className="my-ser-choose">
              <ul>
                {servicesBook.map((item: IServiceBook, index: number) => (
                  <li key={index}>
                    <div className="flex-row my-ser-choose__item">
                      <img
                        src={item.image ? item.image_url : item.org.image_url}
                        onError={(e) => onErrorImg(e)}
                        alt=""
                      />
                      <div className="flex-row-sp my-ser-choose__item-cnt">
                        <span>{item.service_name}</span>
                        {/* <span>{formatPrice(item.price)}đ</span> */}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="my-ser-bot__check-right">
            {
              branches && branches.length > 0 ?
                <div
                  onClick={openBranchesClick}
                  style={open.oBranch ? {
                    zIndex: '2'
                  } : {
                    zIndex: '1'
                  }}
                  className="flex-row-sp choose-branch"
                >
                  <span>
                    {dataBook.branch
                      ? dataBook.branch.full_address
                      : t("my_ser.branch_select")}
                  </span>
                  <img src={icon.dashboard} alt="" />
                  <OrgBranch
                    open={open}
                    setOpen={setOpen}
                    dataBook={dataBook}
                    setDataBook={setDataBook}
                    branches={branches}
                  />
                </div>
                :
                <></>
            }
            <div className="flex-row-sp choose-time">
              <div onClick={openDateClick} className="flex-row-sp date">
                <span>{dataBook.date ? dataBook.date : t("my_ser.date_select")}</span>
                <img src={icon.Calendar} alt="" />
                <OrgDate
                  open={open}
                  setOpen={setOpen}
                  dataBook={dataBook}
                  setDataBook={setDataBook} />
              </div>
              <div onClick={openTimeClick} className="flex-row-sp date">
                <span>{dataBook.time ? dataBook.time : t("my_ser.time_select")}</span>
                <img src={icon.time} alt="" />
                <OrgTime
                  open={open}
                  setOpen={setOpen}
                  dataBook={dataBook}
                  setDataBook={setDataBook}
                />
              </div>
            </div>
            <div className="flex-column-sp my-ser-submit">
              <div style={{ width: "100%" }}>
                <div className="my-ser-submit__title">
                  {t("my_ser.app_info")}
                </div>
                <div className="time">
                  <span className="section__title">{t("order.time")}</span>
                  <span className="info">
                    {!dataBook.time || !dataBook.date
                      ? t("my_ser.pl_select_date")
                      : `Ngày : ${dataBook.time}, ${dataBook.date}`}
                  </span>
                </div>
                <div className="time">
                  {
                    branches?.length > 0 ?
                      <>
                        <span className="section__title">{t("booking.branch")}</span>
                        <div className="branch-info">
                          {!dataBook.branch ? (
                            <span className="info">{t("my_ser.pl_select_br")}</span>
                          ) : (
                            <>
                              <span className="flex-row">
                                <h4>{t("my_ser.name_br")} :</h4>
                                <h3>{dataBook.branch?.name}</h3>
                              </span>
                              <span className="flex-row">
                                <h4>{t("pm.phone_number")} :</h4>
                                <h3>{dataBook.branch?.telephone}</h3>
                              </span>
                              <span className="flex-row">
                                <h4>{t("Mer_de.address")} :</h4>
                                <h3>{dataBook.branch?.full_address}</h3>
                              </span>
                            </>
                          )}
                        </div>
                      </>
                      :
                      <>
                        <span className="section__title">Địa chỉ</span>
                        <span className="flex-row">
                          {/* <h4>{t("my_ser.name_br")} :</h4> */}
                          <h3>{org?.full_address}</h3>
                        </span>
                      </>
                  }
                </div>
                <textarea
                  onChange={(e) => setDataBook({
                    ...dataBook,
                    note: e.target.value
                  })}
                  className="my-ser-submit__note"
                  placeholder={t("pm.note")}
                ></textarea>
              </div>
              <div className="my-ser-submit__btn">
                <ButtonLoading
                  title={t("my_ser.bk_now")}
                  loading={loading}
                  onClick={handleSubmitApp}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <PopupNotiApp
        errCode={errCode}
        setOpen={setOpenNotiApp}
        open={openNotiApp}
      />
    </div>
  );
}

export default ServiceBottom;
