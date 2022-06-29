import React from "react";
import Slider from "react-slick";
import MapTagsItemMB from "./MapTagsItemMB";

export default function MapTagsListMB(props: any) {
    const { listOrg, handleSetLocation } = props;
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: "30px",
        className: "center",
        centerMode: true,
        afterChange: function (index: any) {
            handleSetLocation(listOrg[index]);
        },
    };
    return (
        <div className="map-list__mobile">
            <Slider {...settings}>
                {listOrg.map((item: any, index: number) => (
                    <MapTagsItemMB key={index} item={item} />
                ))}
            </Slider>
        </div>
    );
}
