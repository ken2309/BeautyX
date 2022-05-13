import React, { useContext } from "react";
import "./home.css";
import "../poupSignInUp/popupSignInUp.css";
import { Container } from "@mui/material";
import HomeBanner from "./components/HomeBanner";
import Footer from "../Footer/index";
import { AppContext } from "../../context/AppProvider";
import Head from "../Head/index";
import HeadTitle from "../HeadTitle";
import Bottom from "../../featuresMobile/Bottom";
import HomeSecond from "../Homev2";

//import { useDispatch, useSelector } from 'react-redux';
//import { getAllOrg, fetchAsyncOrg } from '../../redux/orgSlice'

function Home() {
  const { t } = useContext(AppContext);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchAsyncOrg())
  // }, [dispatch])
  return (
    <div className="home">
      <HeadTitle title={t("Home.home")} />
      <Head
        IN_HOME={true}
      // headerStyle={headerStyle}
      />
      {/* <HomeBanner /> */}
      <Container>
        <HomeBanner />
      </Container>
      <HomeSecond />
      {/* {
        profile ?
          <HomeLoggedCalendar />
          :
          <></>
      } */}
      {/* {profile ? (
        <>
          <HomeSecond />
          <div className="h-par-calendar">
            <HomeLoggedCalendar />
          </div>
          <Container>
            <HomeLoggedLocation />
            <HomeLoggedProduct />
            <HomeLoggedForYou />
          </Container>
        </>
      ) : (
        <Container>
          <HomeMap />
          <HomeMiniMap />
          <HomeOrder />
          <HomeCalendar />
          <HomeFlatForm />
          <HomeSignIn />
          <HomeSlider />
        </Container>
      )} */}
      <Footer />
      <Bottom />
    </div>
  );
}

export default Home;
