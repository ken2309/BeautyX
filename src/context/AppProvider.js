/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dateNow from "../utils/dateExp";
import { useDispatch } from 'react-redux';
import dayjs from "dayjs";
import { fetchAsyncUser } from '../redux/USER/userSlice';
import { fetchAsyncHome, fetchAsyncDiscounts } from '../redux/home/homeSlice';
import { fetchAsyncNews, fetchAsyncVideos } from '../redux/blog/blogSlice';
import { fetchAsyncApps } from '../redux/appointment/appSlice';
import { fetchAsyncOrderServices } from '../redux/order/orderSlice';
import { callApiFromTiki } from "../rootComponents/tiki/doPostMessageTiki";
import { EXTRA_FLAT_FORM } from "../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../rootComponents/flatForm";
import useGetMessageTiki from "../rootComponents/useGetMessageTiki";


export const AppContext = createContext();
export default function AppProvider({ children }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lg = localStorage.getItem("i18nextLng");
  const [language, setLanguage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [sign, setSign] = useState();
  const [tempCount, setTempleCount] = useState(0);
  const [dayObj, setDayObj] = useState(dayjs())
  if (localStorage.getItem("_WEB_US")) {
    const tokenDecoded = JSON.parse(`${localStorage.getItem("_WEB_US")}`);
    let exp = tokenDecoded?.token_expired_at;
    let expDate = exp.slice(0, 10).split("-").join("");
    let expTime = exp.slice(11, 19).split(":").join("");
    let dateExp = parseInt(`${expDate}${expTime}`);

    if (dateExp < dateNow) {
      localStorage.removeItem("_WEB_US");
      localStorage.removeItem("_WEB_TK");
    }
  }

  useEffect(() => {
    if (lg === "en-US" || lg === "en") {
      setLanguage("en");
    } else if (lg === "vi-VN" || lg === "vi") {
      setLanguage("vn");
    }
  }, [lg]);
  useEffect(() => {
    const callUserProfile = async () => {
      const res = await dispatch(fetchAsyncUser());
      if (res?.payload) {
        const time = dayjs().format("YYYY-MM");
        dispatch(fetchAsyncApps(time))
        dispatch(fetchAsyncOrderServices({ page: 1 }))
      }
    }
    callUserProfile()
  }, [sign, dispatch]);
  useEffect(() => {
    dispatch(fetchAsyncHome())
    dispatch(fetchAsyncDiscounts({
      page: 1
    }))
    dispatch(fetchAsyncNews());
    dispatch(fetchAsyncVideos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //----------------------------------------------------------
  //get location plat form
  const platform = EXTRA_FLAT_FORM();
  const getLocationPlatFormBeauty = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      sessionStorage.setItem('USER_LOCATION', JSON.stringify(user_location))
    });
  }
  const getLocationPlatFormTiki = async () => {
    const api = "getLocation";
    const params = {
      api: api,
      params: {
        TYPE: 'CALL_API'
      }
    };
    await callApiFromTiki(api, params)
  }
  const response = useGetMessageTiki();
  useEffect(() => {
    if (platform === FLAT_FORM_TYPE.TIKI) {
      getLocationPlatFormTiki()
      if (response && response.result?.res) {
        const user_location = {
          lat: response.result?.res.latitude,
          long: response.result?.res.longitude
        }
        sessionStorage.setItem('USER_LOCATION', JSON.stringify(user_location))
      }
    }
    else if (platform === FLAT_FORM_TYPE.BEAUTYX) {
      getLocationPlatFormBeauty()
    }
  }, [response, getLocationPlatFormTiki]);


  const value = {
    t,
    language,
    openModal,
    setOpenModal,
    setLanguage,
    userInfo,
    setUserInfo,
    setSign,
    tempCount,
    setTempleCount,
    dayObj, setDayObj
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
