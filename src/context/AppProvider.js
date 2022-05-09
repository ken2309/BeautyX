import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dateNow from "../utils/dateExp";
import tagsApi from "../api/tagApi";
import provincesApi from "../api/provinceApi";
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchAsyncUser } from '../redux/USER/userSlice'



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
  const [tags, setTags] = useState([]);
  const [provinces, setProvinces] = useState([])

  // Check if token expires and logout user
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
    } else if (lg === "vi-VN" || lg === "vn") {
      setLanguage("vn");
    }
  }, [lg]);

  // //const TK = localStorage.getItem('_WEB_TK')
  // useEffect(() => {
  //   function handleGetToken() {
  //     const res = JSON.parse(`${localStorage.getItem("_WEB_US")}`);
  //     setUserInfo(res);
  //   }
  //   handleGetToken();
  //   return () => { };
  // }, [sign]);

  useEffect(() => {
    dispatch(fetchAsyncUser())
  }, [sign, dispatch]);
  //get all tags
  async function handleGetAllTags() {
    try {
      const res = await tagsApi.getAll();
      setTags(res.data.context.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleGetProvinces() {
    try {
      const res = await provincesApi.getAll();
      const temp = await res.data.context.data;
      setProvinces(temp.filter(item => item.organizations_count >= 0))
    } catch (err) {
      console.log(err)
    }
  }
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      sessionStorage.setItem('USER_LOCATION', JSON.stringify(user_location))
    });
  }
  useEffect(() => {
    getUserLocation()
    handleGetAllTags();
    handleGetProvinces();
    return function cleanup() {
      getUserLocation()
      handleGetAllTags();
      handleGetProvinces();
    }
  }, []);
  const value = {
    t,
    tags,
    provinces,
    language,
    openModal,
    setOpenModal,
    setLanguage,
    userInfo,
    setUserInfo,
    setSign,
    tempCount,
    setTempleCount,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
