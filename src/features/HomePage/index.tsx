import { Container } from "@mui/material";
import React from "react";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import Bottom from "../../featuresMobile/Bottom";
import ExtraFlatForm from "../../rootComponents/extraFlatForm";
import Footer from "../Footer";
import Head from "../Head";
import HomeDiscount from "../HomeDiscounts";
import HomeBanner from "./HomeBanner";
import HomeFavorite from "./HomeFavorite";
import HomeHotDeal from "./HomeHotDeal";
import HomeHotTrend from "./HomeHotTrend";
import HomeTopService from "./HomeTopService";

export default function HomePage() {
    const FLAT_FORM = EXTRA_FLAT_FORM();

    return (
        <div className="homepage">
            <ExtraFlatForm />
            {FLAT_FORM === "BEAUTYX" && <Head IN_HOME={true} />}
            <Container>
                <HomeBanner />
            </Container>
            <HomeDiscount />
            <Container>
                <HomeHotDeal />
                <HomeHotTrend />
                <HomeTopService />
                <HomeFavorite />
            </Container>
            <Footer />
            <Bottom />
        </div>
    );
}
