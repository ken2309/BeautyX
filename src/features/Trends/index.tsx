import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppProvider";
import TrendItem from "./components/TrendingItem";
import icon from "../../constants/icon";
import Reels from "../Reels/index";
import "./style.css";
import { fetchAsyncTrendVideos, fetchAsyncDataTrends } from '../../redux/video/trendSlice';
import HomeTitle from "../HomePage/Components/HomeTitle";

export default function Trends(props: any) {
    const dispatch = useDispatch();
    const { videos } = props;
    const TRENDs_LISTVIDs = useSelector((state: any) => state.TRENDs).LISTVIDs;
    const TRENDs_VIDEOs = useSelector((state: any) => state.TRENDs).VIDEOs;
    const { t } = useContext(AppContext);
    const [loading, setLoading] = useState<any>(true);
    const [videoCur, setVideoCur] = useState<any>();
    const [openReels, setOpenReels] = useState<any>(false);
    const [index, setIndex] = useState<any>(0);

    const handleFetchAsync = () => {
        let arr;
        setLoading(false)
        arr = TRENDs_LISTVIDs.data.map(async (item: any) => {
            arr = await dispatch(fetchAsyncDataTrends(item));
            return arr;
        });
    };
    useEffect(() => {
        TRENDs_LISTVIDs.status !== 'SUCCESS' && dispatch(fetchAsyncTrendVideos());
        (TRENDs_LISTVIDs.status === 'SUCCESS' && TRENDs_VIDEOs.status !== 'SUCCESS') && handleFetchAsync();
        (TRENDs_VIDEOs.status === 'SUCCESS') && setLoading(false);
    }, [TRENDs_LISTVIDs.status]);
    return (
        <>
            <div className="trend-ctn">
                {/* <div className="trend-ctn-head">
                    <h1>
                        {t("trending.trend")}
                    </h1>
                    <div className="watch-more" onClick={()=>setOpenReels(true)}>
                        <img src={icon.watchMore} className="icon" alt="icon watch more"/> {t("trending.watch_all")}
                    </div>
            </div> */}
                <div className="home-title">
                    <p className="home-title__text">Xu hướng làm đẹp</p>
                    <div
                        onClick={() => setOpenReels(true)}
                        className="home-title__seemore"
                    >
                        <p>{"Xem chi tiết >"}</p>
                    </div>
                </div>
                <div className="trend-ctn-body">
                    {loading ? (
                        <>load</>
                    ) : (
                        TRENDs_VIDEOs.data.map((item: any, index: number) => (
                            <TrendItem
                                data={item}
                                key={index}
                                index={index}
                                setIndex={setIndex}
                                videoCur={videoCur}
                                setVideoCur={setVideoCur}
                                videos={videos}
                                setOpenReels={setOpenReels}
                            />
                        ))
                    )}
                </div>
            </div>
            <Reels open={openReels} setOpen={setOpenReels} initialIndex={index} data={videos} />
        </>
    );
}
