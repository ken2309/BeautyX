import { Container } from "@mui/material";
import React from "react";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import Bottom from "../../featuresMobile/Bottom";
import ExtraFlatForm from "../../rootComponents/extraFlatForm";
import Footer from "../Footer";
import Head from "../Head";
import HomeDiscount from "../HomeDiscounts";
import HomeBanner from "./HomeBanner";
import HomeHotDeal from "./HomeHotDeal";

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
            </Container>
            <Footer />
            <Bottom />
        </div>
    );
}
