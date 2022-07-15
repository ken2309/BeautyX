import { Container } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "./homeTagsProducts.css";
export default function HomeTagsProducts() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 12,
        slidesToScroll: 1,
        arrows: true,
    };
    return (
        <div className="homeTagsPr">
            <Container>
                <div className="homeTagsPr-wrap">
                    <div className="homeTagsPr-list">
                        <Slider {...settings}>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                            <div className="homeTagsPr-item">Rau xanh</div>
                        </Slider>
                    </div>
                </div>
            </Container>
        </div>
    );
}
