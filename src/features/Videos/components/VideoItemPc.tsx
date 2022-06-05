import React, { useEffect, useRef, useState } from 'react';
import scrollTop from "../../../utils/scrollTop";
import icon from "../../../constants/icon";
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import { fetchAsyncOrg } from '../../../redux/org/orgSlice';
import serviceApi from "../../../api/serviceApi";
import { useDispatch } from 'react-redux';
function VideoItemPc(props: any) {
    const { video, videoCur, setVideoCur } = props;
    const sess = window.sessionStorage.getItem("_WEB_TK");
    const history = useHistory();
    const dispatch = useDispatch();
    const videoRef = useRef<any>();
    const vd_url = video?.excerpt?.rendered?.slice(10, video?.excerpt?.rendered?.length - 12);
    const params_id = video?.slug?.split('-');
    const id = params_id[0]?.slice(6, params_id[0]?.length);
    const ser_id = params_id[1]?.slice(6, params_id[1]?.length);
    const [org,setOrg] = useState<any>();
    const [ser,setListSer] = useState<any>();
    const [like,setLike] = useState<any>();
    const getOrgById = async () =>{
        const res = await dispatch(fetchAsyncOrg(id));
        setOrg(res.payload)
    }
    const getSerByOrgId = async () =>{
        const res = await serviceApi.getDetailById({
            org_id:id,
            ser_id:ser_id
        });
        // console.log(res);
        setListSer(res.data.context)
    }
    useEffect(() => {
        if (videoCur?.id === video?.id) {
            videoRef.current.play()
        }else{
            videoRef.current.pause()
        }
        getOrgById();
        getSerByOrgId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // handle func
    const onHoverVideoItem = () => {
        setVideoCur(video)
    }
    const handleGoOrgDetail = () => {
        scrollTop()
        history.push({
            pathname: `/org/${org.subdomain}`,
            state: org,
        })
    }
    const handleReact = () => {

    }
    // === end ===
    return (
        <>
        <header>
            <div className="video-item-header_ava" 
                onClick={handleGoOrgDetail}
            >
                <Avatar 
                alt="Remy Sharp" 
                src={org?.image_url} 
                sx={{ width: 32, height: 32 }}/>
                <div className='video-item-header_name'>
                    <span>{org?.name}</span>
                    <span className="video-item-header_time">Đã đămg 5 giờ trước</span>
                </div>
            </div>
        </header>
        <div className="video-item_body-status">
                <span>
                    Video meta description <br/>
                    <span className="hastag">#tagline1 #tagline2</span>
                </span>
            </div>
        <div className="video-item_body">
            <div className="video-item_body-image"
                
            >
                <div
                    onMouseEnter={onHoverVideoItem}
                    className='video-item-pc__wr'
                >
                    <video
                        ref={videoRef}
                        className='video-item__pc'
                        controls
                        // autoPlay={true}
                        loop
                    >
                        <source src={vd_url} type="video/mp4" />
                    </video>
                    <div className="blur"></div>
                    <video 
                         ref={videoRef}
                         className='video-item__pc back-drop__vid'
                         controls
                         // autoPlay={true}
                         loop
                    >
                        <source src={vd_url} type="video/mp4" />
                    </video>
                </div>
                <div className="video-item_product_list">
                    {/* {
                    data.ser.map((item))
                    } */}
                    <div>                
                        <div className="video-item_product_item">
                            <div className="video-item_product_item-img">
                                <img src={ser?.image_url} alt=""/>
                            </div>
                            <div className="video-item_product_item-title">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. At fugiat autem libero quis nesciunt, accusantium eveniet officia blanditiis totam pariatur magni assumenda modi, mollitia nulla tempora. Distinctio mollitia culpa blanditiis.
                            </div>
                            <div className="video-item_product_item-price">
                                <img src={icon.ShoppingCartSimpleWhite} alt=""/>
                            </div>
                        </div>
                        <div className="video-item_product_item">
                            <div className="video-item_product_item-img">
                                <img src={ser?.image_url} alt=""/>
                            </div>
                            <div className="video-item_product_item-title">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. At fugiat autem libero quis nesciunt, accusantium eveniet officia blanditiis totam pariatur magni assumenda modi, mollitia nulla tempora. Distinctio mollitia culpa blanditiis.
                            </div>
                            <div className="video-item_product_item-price">
                                <img src={icon.ShoppingCartSimpleWhite} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="video-item_react-ctn">
                <div className="react-btn">
                    <div className="like" onClick={handleReact}>
                        {
                            like
                            ?
                            <img className="icon" src={icon.heart} alt=""/>
                            :
                            <img className="icon" src={icon.unHeartWhite} alt=""/>
                        }
                        <span>20</span>
                    </div>
                    <div className="comment">
                        <img className="icon" src={icon.comment} alt=""/>
                        <span>20</span>
                    </div>
                    <div className="share_link">
                        <img className="icon" src={icon.share} alt=""/>
                    </div>
                    </div>
                </div>
                <div className="video-item_comment">
                    {/* <Avatar
                        alt={user_info.fullname}  
                        sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center' }}
                    >
                            {user_info.fullname}
                    </Avatar>
                    <div className="avatar">
                        {user_info.fullname}
                    </div>
                    <div className="add-comment" onClick={()=>setCommentNow(true)}>
                        Thêm bình luận 
                    </div> */}
                    {/* <div className="icon_recommend">
                        {list_icon.map((item,index)=><div key={index} className="item">{item}</div>)}
                    </div> */}
            </div>
        </div>
        </>
    );
}

export default VideoItemPc;