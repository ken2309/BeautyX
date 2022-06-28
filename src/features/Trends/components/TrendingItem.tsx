import {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import onErrorImg from '../../../utils/errorImg';
export default function TrendItem(props:any){
    const { data, setOpenReels, index, setIndex } = props;
    const {
        org,
        ser,
        cmt
    } = data.resVidData
    const vd_url = data.video?.excerpt?.rendered?.slice(10, data.video?.excerpt?.rendered?.length - 12);
    const videoRef = useRef<any>();
    const handleReels = () =>{
        setOpenReels(true);
        setIndex(index)
    }
    return(
        <div 
            className="trend-item-ctn"
            // onMouseEnter={onHoverVideoItem}
            // onMouseLeave={onLeaceHoverVideoItem}
        >
            <div className="logo">
                <img src={org?.context.image_url} onError={(e)=>onErrorImg(e)} alt=""/>
            </div>
            <video
                onClick={handleReels}
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
                    {org?.context.name}
                </span>
            </div>
        </div>
    )   
}