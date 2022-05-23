/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import "./head.css";
import { Container } from "@mui/material";
import ButtonCus from "../../components/ButtonCus";
import { AppContext } from "../../context/AppProvider";
import { useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import img from "../../constants/img";
import Notification from "./components/Notification";
import Language from "./components/Language";
import Menu from "./components/Menu";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "../../redux/cartSlice";
import MbMenu from "../../featuresMobile/Menu";
import scrollTop from "../../utils/scrollTop";
import HomeFilter from '../Home/components/HomeFilter';
import SearchFilter from "../../featuresMobile/SearchResult/SearchFilter";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";

const styleFilter = {
  width: '41.5%',
  boxShadow: "rgb(0 0 0 / 14%) -2px 1px 16px 0px",
  padding: "12px",
  transform: 'translateX(0%)'
}

function openFilter() {
  document.querySelector('.header-filter')?.classList.toggle('header-file__ac')
}
function hiddenFilter() {
  document.querySelector('.header-filter')?.classList.remove('header-file__ac')
}
// onload event 
window.addEventListener("scroll", function () {
  if (hiddenFilter) {
    hiddenFilter()
  }
});
//////

function Head(props: any) {
  const {
    t,
    //profile,
    //userInfo
  } = useContext(AppContext);
  const FLAT_FORM = EXTRA_FLAT_FORM();
  const {
    IN_HOME,
    setCloseDialog,
    headerStyle,
    handleCancelPayment,
    prev_url
  } = props;
  const dispatch = useDispatch();
  const [openNo, setOpenNo] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMbMenu, setOpenMbMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [unit, setUnit] = useState("VND");
  const history = useHistory();

  //get total amount cart

  const carts = useSelector((state: any) => state.carts);
  const USER = useSelector((state: any) => state.USER.USER);

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, carts]);
  const gotoPartner = () => {
    if (IN_HOME === true) {
      history.push("/kenh-nguoi-ban");
    } else {
      if (handleCancelPayment) {
        handleCancelPayment()
      }
      if (prev_url) {
        history.push(`${prev_url}`)
      } else {
        history.goBack() || history.push('/');
      }
    }
  };
  const gotoPageSignUp = () => {
    history.push({
      pathname: "/sign-up",
      search: "2",
    });
  };
  const gotoPageSignIn = () => {
    history.push({
      pathname: "/sign-in",
      search: "1",
    });
  };
  const openNotiClick = () => {
    setOpenNo(!openNo);
    setOpenLang(false);
    setOpenMenu(false);
  };
  const openLangClick = () => {
    setOpenLang(!openLang);
    setOpenNo(false);
    setOpenMenu(false);
  };
  const openMenuClick = () => {
    setOpenMenu(!openMenu);
    setOpenLang(false);
    setOpenNo(false);
  };
  const handleBack = () => {
    if (handleCancelPayment) {
      handleCancelPayment()
    }
    if (setCloseDialog) {
      return setCloseDialog(false);
    }
    if (prev_url) {
      history.push(`${prev_url}`)
    }
    else {
      history.goBack(-1)
    }
    scrollTop();
  };
  const onBackHome = () => {
    if (handleCancelPayment) {
      handleCancelPayment()
    }
    history.push("/")
  }
  return (
    <div
      style={headerStyle}
      className="hd"
    >
      <Container>
        <div className="flex-row-sp hd-cnt">
          <div className="hd-logo">
            <img onClick={onBackHome} src={img.beautyX} alt="" />
          </div>
          <div className="flex-row hd-cnt__left">
            <ButtonCus
              text={IN_HOME === true ? t("Header.seller_center") : t("Header.back")}
              borderRadius="18px"
              lineHeight="20px"
              color="var(--purple)"
              border="solid 1px var(--purple)"
              onClick={gotoPartner}
            />
            <button
              onClick={() => history.push('/beautyx-videos')}
              className="flex-row hd-cnt__left-btn"
            >
              <img src={icon.playCirclePurple} alt="" />
              Video
            </button>
            <button onClick={() => history.push('/tin-tuc')} className="flex-row hd-cnt__left-btn">
              <img src={icon.newsPurple} alt="" />
              Tin tức
            </button>
          </div>
          <img
            onClick={handleBack}
            src={icon.backWhite}
            alt=""
            className="mb-back__btn"
          />
          <div
            style={
              USER
                ? { justifyContent: "space-between" }
                : { justifyContent: "flex-end" }
            }
            className="flex-row hd-cnt__right"
          >
            <div className="header-search">
              <img
                className="header-search-icon"
                src={icon.searchPurple} alt=""
                onClick={() => openFilter()}
              />
              <div className="header-filter">
                <div className="header-filter__wrap">
                  <HomeFilter
                    styleFilter={styleFilter}
                    hiddenFilter={hiddenFilter}
                  />
                </div>
              </div>
            </div>
            {!USER ? (
              <>
                <div className="flex-row hd-cnt__sign-btn">
                  <ButtonCus
                    text={t("Home.Sign_up")}
                    fontSize="14px"
                    lineHeight="20px"
                    color="var(--purple)"
                    onClick={gotoPageSignUp}
                  />
                  <ButtonCus
                    text={t("Home.Sign_in")}
                    color="var(--bg-gray)"
                    fontSize="14px"
                    lineHeight="20px"
                    backColor="var(--purple)"
                    borderRadius="18px"
                    onClick={gotoPageSignIn}
                  />
                  <img
                    className="hd-cnt__right-avatar"
                    src={icon.userCircle}
                    alt=""
                  />
                </div>
              </>
            ) : (
              <div className="flex-row hd-cnt__right-user">
                <span
                  className="hd-cnt__right-user-name"
                  onClick={() => history.push("/tai-khoan/thong-tin-ca-nhan")}
                >
                  {USER?.fullname}
                </span>
                <div onClick={openNotiClick} className="hd-cnt__right-avatar">
                  {
                    USER ?
                      <img style={{ borderRadius: '100%' }} onClick={openNotiClick} src={USER?.avatar} alt="" />
                      :
                      <div className="blank-avatar">
                        {USER?.fullname?.slice(0, 1)}
                      </div>
                  }
                  <div className="hd-cnt__right-avatar-dot"></div>
                  <Notification openNo={openNo} />
                </div>
              </div>
            )}
            {/* menu for mobile */}
            <div className="mb-hd-cnt__right">
              <div className="flex-row-sp">
                <button
                  onClick={() => setOpenSearch(true)}
                >
                  <img src={icon.search} alt="" />
                </button>
                <div className="flex-row">
                  <div
                    onClick={() => history.push("/cart")}
                    className="hd-cnt__right-cart"
                  >
                    <img src={icon.ShoppingCartSimpleWhite} alt="" />
                    <div className="hd-cnt__right-cart-total">
                      {carts.cartQuantity}
                    </div>
                  </div>
                  {
                    FLAT_FORM === "BEAUTYX" &&
                    <img
                      onClick={() => setOpenMbMenu(true)}
                      src={icon.menuWhite}
                      alt=""
                    />
                  }
                </div>
              </div>
            </div>
            {
              FLAT_FORM === "BEAUTYX" &&
              <MbMenu openMbMenu={openMbMenu} setOpenMbMenu={setOpenMbMenu} />
            }
            {/* --- */}
            <div
              onClick={() => history.push("/cart")}
              className="hd-cnt__right-cart"
            >
              <img src={icon.ShoppingCartSimple} alt="" />
              <div className="hd-cnt__right-cart-total">
                {carts.cartQuantity}
              </div>
            </div>
            <div className="hd-cnt__right-menu">
              <img onClick={openMenuClick} src={icon.Menu} alt="" />
              <Menu
                //profile={profile}
                USER={USER}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            </div>
            <div
              onClick={openLangClick}
              className="hd-cnt__right-lang"
            >
              <div className="flex-row">
                <img src={icon.Money} alt="" />
                {unit}
              </div>
              <Language
                openLang={openLang}
                unit={unit}
                setUnit={setUnit}
                setOpenLang={setOpenLang}
              />
            </div>
          </div>
        </div>
      </Container>
      <SearchFilter
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />
    </div>
  );
}

export default Head;
