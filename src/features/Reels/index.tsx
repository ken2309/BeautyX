import React, { useState } from 'react';

import { Drawer } from "@mui/material";
import Video from "./components/video";
import icon from "../../constants/icon";
import "./style.css";
export default function Reels(props:any){
    const {open,setOpen,data} = props
    const [videoCur, setVideoCur] = useState<any>();
    console.log(data);
    return (
        <>
        <Drawer
            open={open}
            anchor='right'
            onClose={() => setOpen(false)}
            sx={{inset: 0, margin: 'auto'}}
        >
        <div style={{width: '100vw'}}>
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
                    data?.map((item: any, index: number)=>(
                        <Video
                        key={index}
                        video={item}
                        videoCur={videoCur}
                        setVideoCur={setVideoCur}      
                        />
                    ))
                }
            
            </div>
        </div>
        </Drawer>
        </>
    )
}