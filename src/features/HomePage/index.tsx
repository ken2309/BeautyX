import { Container } from "@mui/material";
import React from "react";
import Bottom from "../../featuresMobile/Bottom";
import ExtraFlatForm from "../../rootComponents/extraFlatForm";
import useFullScreen from "../../utils/useFullScreen";
import Footer from "../Footer";
import Head from "../Head";
import HeadHomeMobile from "../HeadMobile/HeadHomeMobile";
import HomeDiscount from "../HomeDiscounts";
import HomeBanner from "./HomeBanner";
import HomeFavorite from "./HomeFavorite";
import HomeHotDeal from "./HomeHotDeal";
import HomeHotTrend from "./HomeHotTrend";
import HomeRecomment from "./HomeRecomment";
import HomeTopService from "./HomeTopService";
import HomeBannerResult from "./HomeBanner/homeSearchReasult";
import HomeTags from "./HomeTags";
import HomeProvince from "./HomeProvince";

export default function HomePage() {
    const IS_MB = useFullScreen();
    return (
        <div className="homepage">
            <ExtraFlatForm />
            {IS_MB ? <HeadHomeMobile /> : <Head IN_HOME={true} />}
            <Container>
                <HomeBanner />
                <HomeTags />
            </Container>
            <HomeDiscount />
            <Container>
                <HomeHotDeal />
                <HomeTopService />
                {/* <HomeHotTrend /> */}
                <HomeFavorite />
                <HomeProvince />
                <HomeRecomment />
            </Container>
            <Footer />
            <Bottom />
        </div>
    );
}
