import {useRef, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import icon from '../../../constants/icon';
import { fetchAsyncOrg } from '../../../redux/org/orgSlice';
import {useElementOnScreen} from '../../../utils/useElementScreen';
import { fetchAsyncOrgComments } from '../../../redux/org/orgCommentsSlice';

import onErrorImg from '../../../utils/errorImg';
export default function Video(props:any){
    const { video,videoCur,setVideoCur } = props;
    const dispatch = useDispatch();
    const videoRef = useRef<any>();
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };
    const isVisable = useElementOnScreen(options, videoRef);

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
    const getCommentsByOrg = async () =>{
        const res = await dispatch(fetchAsyncOrgComments({
            org_id: id,
            page: 1,
        }));
        console.log(res);
        // setData({...data,org:res.payload})
    }


    useEffect(() => {
        if (isVisable) {
                videoRef.current.play();
           
        } else {
                videoRef.current.pause();
        }
        getOrgById();
        getCommentsByOrg();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisable])
    console.log(data);
    return(
        <>
        <div 
            className="trend-item-ctn"
        >
            <div className="video-control__info">
                <div className="left">
                    <div className="video-control__info-label">
                        <img
                        // onClick={onOrgDetail}
                        src={data.org?.image_url}
                        alt=""
                        className="org_avt org_avt-spin"
                        onError={(e) => onErrorImg(e)}
                        />
                        <span 
                        // onClick={onOrgDetail}
                        className="org__name">
                            @{data.org?.name?.split(' ').length>46?data.org?.name.slice(0, 50)+'...':data.org?.name}
                        </span>
                    </div>
                    <span className="ser__name" dangerouslySetInnerHTML={{__html: video.title.rendered}}>
                        {/* {video?.title?.rendered?.split(' ').length>6?video?.title?.rendered.slice(0, 50)+'...':video?.title?.rendered} */}
                    </span>
                </div>
                <div className="flex-column-sp right">
                    <div className="right-item">
                        <img
                            // onClick={onFavorite}
                            className='right-item__img'
                            src={data.is_favorite === true ? icon.heart : icon.unHeart} alt=""
                            // src={icon.unHeart}
                        />
                        <span
                            className='right-item__count'
                        >
                            {/* {follow.favoritesCount} */}
                            123
                        </span>
                    </div>
                    <div className="right-item">
                        <div className="comment">
                            <svg aria-label="Comment" color="white" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
                                </path>
                            </svg>
                        </div>
                        <span
                            className='right-item__count'
                        >
                            {/* {data.comments.length} */}
                            123
                        </span>
                    </div>
                    <div className="right-item">
                        <div className="share">
                            <svg aria-label="Share Post" color="white" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                            </svg>
                        </div>
                        <span
                            className='right-item__count'
                        >
                            {/* {data.comments.length} */}
                            123
                        </span>
                    </div>
                    
                </div>
            </div>
            <video
                ref={videoRef}
                className='video-item__pc'
                webkit-playsinline="webkit-playsinline"
                playsInline={true}
                style={{ width: '100%', height: '100%' }}
                loop
            >
                <source src={vd_url} type="video/mp4" />
            </video>
        </div>
        </>
    )
}