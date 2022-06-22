import React from "react";
import "./homeBanner.css";
import Head from "../Head";
import img from "../../constants/img";

const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
};

function HomeBanner(props: any) {
    return (
        <>
            <Head headerStyle={headerStyle} />
            <div className="banner">
                <img className="banner-img" src={img.banner} alt="" />
            </div>
        </>
    );
}

export default HomeBanner;
