import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Drawer } from "@mui/material";
import Video from "./components/video";
import icon from "../../constants/icon";
import "./style.css";
import Slider from "react-slick";

export default function Reels(props: any) {
    const { open, setOpen, initialIndex } = props
    const [videoCur, setVideoCur] = useState<any>();
    const TRENDs_VIDEOs = useSelector((state: any) => state.TRENDs).VIDEOs;
    const slickRef = useRef<any>();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplay: true,
        vertical: true,
        verticalSwiping: true,
        initialSlide: initialIndex,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    swipe: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    swipe: true,
                    dots: true,
                    speed: 500,
                },
            },
        ],
    };
    console.log(initialIndex);
    return (
        <>
            <Drawer
                open={open}
                anchor='right'
                onClose={() => setOpen(false)}
                className="reel"
                sx={{ inset: 0, margin: 'auto' }}
            >
                <div className="reel-head">
                    <button
                        onClick={() => setOpen(false)}
                        className="reel-header__back-btn"
                    >
                        <img src={icon.backWhite} alt="" />
                    </button>
                </div>
                <div
                    className='video__list'
                >
                    <Slider ref={slickRef} {...settings}>
                        {
                            TRENDs_VIDEOs?.data.map((item: any, index: number) => (
                                <Video
                                    key={index}
                                    data={item}
                                    videoCur={videoCur}
                                    setVideoCur={setVideoCur}
                                />
                            ))
                        }
                    </Slider>
                </div>
            </Drawer>
        </>
    )
}