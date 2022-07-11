import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Drawer, formLabelClasses } from "@mui/material";
import Video from "./components/video";
import icon from "../../constants/icon";
import "./style.css";

export default function Reels(props: any) {
    const { open, setOpen, initialIndex } = props
    const [videoCur, setVideoCur] = useState<any>();
    const TRENDs_VIDEOs = useSelector((state: any) => state.TRENDs).VIDEOs;
    const slickRef = useRef<any>();
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
                    {
                        TRENDs_VIDEOs?.data.map((item: any, index: number) => (
                            <Video
                                key={index}
                                org= {item?.resVidData.org.context}
                                sers= {item?.resVidData.ser}
                                cmt= {item?.resVidData.cmt}
                                video= {item.video}
                                index={index}
                                initialIndex={initialIndex}
                                videoCur={videoCur}
                                setVideoCur={setVideoCur}
                            />
                        ))
                    }
                </div>
            </Drawer>
        </>
    )
}