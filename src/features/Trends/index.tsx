import {useState,useContext,useEffect} from 'react';
import { AppContext } from '../../context/AppProvider';
import TrendItem from "./components/TrendingItem";
import icon from "../../constants/icon";
import Reels from '../Reels/index';
import './style.css';



export default function Trends(props:any) {
    //const { videos } = useSelector((state: any) => state.BLOG.VIDEOS);
    const {videos} =props;
    const { t } = useContext(AppContext)
    const [loading,setLoading]=useState<any>(true);
    const [videoCur, setVideoCur] = useState<any>()
    const [openReels,setOpenReels] = useState<any>(false);
    useEffect(()=>{
        videos&&setLoading(false)
    },[videos])
    return (
        <>
        <div className="trend-ctn">
            <div className="trend-ctn-head">
                    <h1>
                        {t("trending.trend")}
                    </h1>
                    <div className="watch-more" onClick={()=>setOpenReels(true)}>
                        <img src={icon.watchMore} className="icon" alt="icon watch more"/> {t("trending.watch_all")}
                    </div>
            </div>
            <div className="trend-ctn-body">
                {
                    loading?
                    <>
                    load
                    </>
                    :
                    videos.map((item: any, index: number)=>(
                        <TrendItem
                            video={item}
                            key={index}
                            videoCur={videoCur}
                            setVideoCur={setVideoCur}
                            videos={videos}
                            setOpenReels={setOpenReels}
                        />
                    ))
                }
            </div>
        </div>  
        <Reels
            open={openReels}
            setOpen={setOpenReels}
            data={videos}
        />
        </>
    );
}