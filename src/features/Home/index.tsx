/* eslint-disable no-useless-escape */
import React from "react";
import "./home.css";
import "../poupSignInUp/popupSignInUp.css";
import { Container } from "@mui/material";
import Footer from "../Footer/index";
import Head from "../Head/index";
import Bottom from "../../featuresMobile/Bottom";
import HomeSecond from "../Homev2";
import ExtraFlatForm from "../../rootComponents/extraFlatForm";
import useFullScreen from "../../utils/useFullScreen";
import HeadHomeMobile from "../HeadMobile/HeadHomeMobile";
import ChatBox from '../ChatBox';
function Home() {
  const IS_MB = useFullScreen();

  return (
    <div className="home">
      <ExtraFlatForm />
      {IS_MB ? <HeadHomeMobile /> : <Head IN_HOME={true} />}
      <Container>
       
      </Container>
      <HomeSecond />
      <ChatBox/>
      <Footer />
      <Bottom />
    </div>
  );
}

export default Home;
