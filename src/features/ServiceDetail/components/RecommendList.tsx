import React, { useState } from "react";
import SectionTitle from "../../SectionTitle/index";
import Carousel from "react-elastic-carousel";
import ServiceItem from "../../ViewItemCommon/ServiceItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const buttons = [
    { id: 1, text: "Sắp hết hạn" },
    { id: 2, text: "Giảm nhiều" },
];
function RecommendList(props: any) {
    const { org, list } = props;
    const title = `Ưu đãi của "${org?.name}"`;
    const [activeBtn, setActiveBtn] = useState();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        swipe: false,
        appendDots: (dots: any) => (
            <div>
                <ul>{dots}</ul>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    swipe: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    swipe: true,
                    autoplay: false,
                    infinite: false,
                },
            },
        ],
    };
    return (
        <div className="recomment-cnt">
            <div className="flex-row-sp mer-sale-head">
                <SectionTitle title={title} />
                {/* <div className="flex-row mer-sale-head__sort">
                    Sắp xếp theo:
                    {buttons.map((item: any, index) => (
                        <button
                            style={
                                activeBtn === item
                                    ? {
                                          backgroundColor: "var(--purple)",
                                          color: "var(--bg-gray)",
                                      }
                                    : {}
                            }
                            onClick={() => setActiveBtn(item)}
                            key={index}
                        >
                            {item.text}
                        </button>
                    ))}
                </div> */}
            </div>

            <div className="recomment-list">
                {list.map((item: any, index: number) => (
                    <ServiceItem key={index} org={org} service={item} />
                ))}
            </div>
        </div>
    );
}

export default RecommendList;
