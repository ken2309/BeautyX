import React from "react";
import Avatar from '@mui/material/Avatar';

export default function PostHead (props:any) {
    const {org, video, handleGoOrgDetail} = props;
    return (
    <>
    <header>
        <div className="video-item-header_ava"
            onClick={handleGoOrgDetail}
        >
            <Avatar
                alt={org?.name}
                src={org?.image_url}
                sx={{ width: 32, height: 32 }} />
            <div className='video-item-header_name'>
                <span>{org?.name}</span>
                <span className="video-item-header_time">Đã đămg 5 giờ trước</span>
            </div>
        </div>
    </header>
    <div className="video-item_body-status">
        <span>
            <span dangerouslySetInnerHTML={{ __html: video.title.rendered }}></span> <br />
            <span className="hastag">#tagline1 #tagline2</span>
        </span>
    </div>
    </>
    )
}