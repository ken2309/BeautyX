import React, { useEffect, useRef } from 'react';
export default function PostVideo (props:any) {
    const {vd_url,video,videoCur,setVideoCur} = props
    const videoRef = useRef<any>();
    const videoRefBack = useRef<any>();
    const onHoverVideoItem = () => {
        setVideoCur(video)
    }
    useEffect(() => {
        if (videoCur?.id === video?.id) {
            videoRef.current.play();
            videoRefBack.current.play();
        } else {
            videoRef.current.pause();
            videoRefBack.current.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoCur])
    return(
        <div
            onClick={onHoverVideoItem}
            className='video-item-pc__wr'
        >
            <video
                ref={videoRef}
                className='video-item__pc'
                // controls
                // autoPlay={true}
                loop
            >
                <source src={vd_url} type="video/mp4" />
            </video>
            <div className="blur"></div>
            <video
                ref={videoRefBack}
                className='video-item__pc back-drop__vid'
                // controls
                // autoPlay={true}
                loop
            >
                <source src={vd_url} type="video/mp4" />
            </video>
        </div>
    )
}