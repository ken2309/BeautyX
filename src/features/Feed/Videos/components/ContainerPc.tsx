import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAsyncDataVideos,
    setResetInitialState,
    resetVIDEOs,
} from "../../../../redux/video/videosSlice";
import VideoItemPc from "./VideoItemPc";

function ContainerPc(props: any) {
    const { videos } = props;
    const dispatch = useDispatch();
    const RESET_STATE = useSelector((state: any) => state.VID).RESET_STATE;
    const VIDEOsDATA = useSelector((state: any) => state.VID).VIDEOs;
    const [videoCur, setVideoCur] = useState<any>();
    const handleFetchAsync = () => {
        // (videos.data)&&dispatch(fetchAsyncDataVideos(videos.data[0]));
        console.log("handleFetchAsync =====");
        let arr;
        dispatch(setResetInitialState(false));
        dispatch(resetVIDEOs());
        videos.data &&
            videos.data[0] &&
            videos.data.map(async (item: any, index: any) => {
                console.log(index);
                arr = await dispatch(fetchAsyncDataVideos(item));
                return arr;
            });
    };
    useEffect(() => {
        videos.status === "SUCCESS" && RESET_STATE && handleFetchAsync();
        // (videos.status==='SUCCESS'&&(RESET_STATE))&&handleFetchAsync()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videos.status]);
    return (
        <div className="video-list-des">
            <ul className="video-list">
                {VIDEOsDATA.data?.map((item: any, index: number) => (
                    <li key={index} className="video-item-pc">
                        <VideoItemPc
                            video={item?.video}
                            org={item?.resVidData?.org.context}
                            cmt={item?.resVidData?.cmt}
                            sers={item?.resVidData?.sers}
                            videoCur={videoCur}
                            setVideoCur={setVideoCur}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default React.memo(ContainerPc);
