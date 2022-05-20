import React, { useEffect, useRef } from 'react';

function VideoItemPc(props: any) {
    const { video, videoCur, setVideoCur } = props;
    const videoRef = useRef<any>();
    const vd_url = video?.excerpt?.rendered?.slice(10, video?.excerpt?.rendered?.length - 12);
    const onHoverVideoItem = () => {
        setVideoCur(video)
    }
    useEffect(() => {
        if (videoCur?.id === video?.id) {
            videoRef.current.play()
        }else{
            videoRef.current.pause()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoCur])
    return (
        <div
            onMouseEnter={onHoverVideoItem}
            className='video-item-pc__wr'
        >
            <video
                ref={videoRef}
                className='video-item__pc'
                // autoPlay={true}
            >
                <source src={vd_url} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoItemPc;