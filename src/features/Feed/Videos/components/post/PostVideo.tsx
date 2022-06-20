import React, { useEffect, useRef } from "react";
export default function PostVideo(props: any) {
    const { vd_url, video, videoCur, setVideoCur, setOpenCmtDialog, is_mute } =
        props;
    const videoRef = useRef<any>();
    const videoRefBack = useRef<any>();
    const onHoverVideoItem = () => {
        setVideoCur(video);
        setOpenCmtDialog && setOpenCmtDialog(true);
        let isPaused = videoRef.current.paused || false;
        handleVid(!isPaused);
    };
    const handleVid = (isPlaying: any) => {
        if (isPlaying) {
            videoRef.current.pause();
            videoRefBack.current.pause();
        } else {
            videoRef.current.pause();
            videoRefBack.current.pause();
        }
    };
    useEffect(() => {
        let isPalying = videoCur?.id === video?.id || false;
        handleVid(isPalying);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoCur]);
    // console.log(videoCur);
    return (
        <div onClick={onHoverVideoItem} className="video-item-pc__wr">
            <video
                ref={videoRef}
                className="video-item__pc"
                controls={is_mute ? false : true}
                // controls
                // autoPlay={true}
                muted={is_mute}
                webkit-playsinline="webkit-playsinline"
                playsInline={true}
                loop
            >
                <source src={vd_url} type="video/mp4" />
            </video>
            <div className="blur"></div>
            <video
                ref={videoRefBack}
                className="video-item__pc back-drop__vid"
                // controls
                // autoPlay={true}
                muted
                webkit-playsinline="webkit-playsinline"
                playsInline={true}
                loop
            >
                <source src={vd_url} type="video/mp4" />
            </video>
        </div>
    );
}
