import { Container } from "@mui/material";
import React from "react";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import Bottom from "../../featuresMobile/Bottom";
import ExtraFlatForm from "../../rootComponents/extraFlatForm";
import Footer from "../Footer";
import Head from "../Head";
import HomeDiscount from "../HomeDiscounts";
import HomeProvince from "../Homev2/components/HomeProvince";
import HomeTags from "../Homev2/components/HomeTags";
import HomeBanner from "./HomeBanner";
import HomeFavorite from "./HomeFavorite";
import HomeHotDeal from "./HomeHotDeal";
import HomeHotTrend from "./HomeHotTrend";
import HomeRecomment from "./HomeRecomment";
import HomeTopService from "./HomeTopService";

export default function HomePage() {
    const FLAT_FORM = EXTRA_FLAT_FORM();

    return (
        <div className="homepage">
            <ExtraFlatForm />
            {FLAT_FORM === "BEAUTYX" && <Head IN_HOME={true} />}
            <Container>
                <HomeBanner />
                <HomeTags />
            </Container>
            <HomeDiscount />
            <Container>
                <HomeHotDeal />
                <HomeTopService />
                <HomeHotTrend />
                <HomeFavorite />
                <HomeRecomment />
            </Container>
            <Footer />
            <Bottom />
        </div>
    );
}
