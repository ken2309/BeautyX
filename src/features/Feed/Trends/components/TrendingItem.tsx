import {useRef, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncOrg } from '../../../../redux/org/orgSlice';
import onErrorImg from '../../../../utils/errorImg';
export default function TrendItem(props:any){
    const { video,setOpenReels } = props;
    const videoRef = useRef<any>();
    const dispatch = useDispatch();
    const vd_url = video?.excerpt?.rendered?.slice(10, video?.excerpt?.rendered?.length - 12);
    const params_id = video?.slug?.split('-');
    const id = params_id[0]?.slice(6, params_id[0]?.length);
    const ser_id = params_id[1]?.slice(6, params_id[1]?.length);
    const [data,setData]=useState<any>(
        {
            org:{},
            ser:[]
        }
    );
    const getOrgById = async () =>{
        const res = await dispatch(fetchAsyncOrg(id));
        setData({...data,org:res.payload})
    }
    useEffect(() => {
        videoRef.current.play();
        getOrgById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <div 
            className="trend-item-ctn"
            // onMouseEnter={onHoverVideoItem}
            // onMouseLeave={onLeaceHoverVideoItem}
        >
            <div className="logo">
                <img src={data.org?.image_url} onError={(e)=>onErrorImg(e)} alt=""/>
            </div>
            <video
                onClick={()=>setOpenReels(true)}
                ref={videoRef}
                className='video-item__pc'
                webkit-playsinline="webkit-playsinline"
                playsInline={true}
                autoPlay={true}
                loop
                muted
            >
                <source src={vd_url} type="video/mp4" />
            </video>
            <div className="title">
                <span className="text">
                    {data.org?.name}
                </span>
            </div>
        </div>
    )   
}