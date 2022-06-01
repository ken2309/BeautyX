/* eslint-disable no-useless-escape */
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
import ExtraFlatForm from "../../rootComponents/extraFlatForm";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import HomeSearchInput from "./components/HomeSearchInput";

function Home() {
  const { t } = useContext(AppContext);
  const FLAT_FORM = EXTRA_FLAT_FORM();

  return (
    <div className="home">
      <ExtraFlatForm />
      <HeadTitle title={t("Home.home")} />
      {
        FLAT_FORM === "BEAUTYX" &&
        <Head
          IN_HOME={true}
        />
      }
      <Container>
        <HomeBanner />
        {
          FLAT_FORM !== "BEAUTYX" &&
          <HomeSearchInput />
        }
      </Container>
      <HomeSecond />
      <Footer />
      <Bottom />
    </div>
  );
}

export default Home;
