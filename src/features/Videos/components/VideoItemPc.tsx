import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { Drawer } from "@mui/material";
import { useHistory } from 'react-router-dom';
import icon from "../../../constants/icon";
import serviceApi from "../../../api/serviceApi";
import scrollTop from "../../../utils/scrollTop";
import formatPrice from '../../../utils/formatPrice';
import EvaluateInput from '../../Reviews/EvaluateInput';
import errorImg from '../../../utils/errorImg';
import { IOrganization } from '../../../interface/organization';
import { IComment } from '../../../interface/comments';
import { Service } from '../../../interface/service';
// api
import { fetchAsyncOrg, onFavoriteOrg, onDeleteFavoriteOrg } from '../../../redux/org/orgSlice';
import { fetchAsyncOrgComments, postAsyncOrgComments } from '../../../redux/org/orgCommentsSlice';

function VideoItemPc(props: any) {
    const { video, videoCur, setVideoCur } = props;
    const sess = window.sessionStorage.getItem("_WEB_TK");
    const history = useHistory();
    const dispatch = useDispatch();
    const videoRef = useRef<any>();
    const USER = useSelector((state: any) => state.USER);
    const [cmtDialog,setOpen]
    const user = USER.USER;
    // ---- interface ----
        interface IReact {
            favoriteCount: number;
            isFavorite: Boolean;
        }
        interface ICmt {
            text: String;
            url?: String
        }
        interface Comments {
            comments:any;
            totalItem:number
        }
        interface IData {
            org?: IOrganization | null;
            ser?: Array<Service>|null;
            cmt?: Comments|null
        }
    // ---- video ----
        const vd_url = video?.excerpt?.rendered?.slice(10, video?.excerpt?.rendered?.length - 12);
    // ---- end ---- //
    // ---- org - service ---- 
        const params_id = video?.slug?.split('-');
        const id = params_id[0]?.slice(6, params_id[0]?.length);
        const ser_params = params_id[1]?.slice(6, params_id[1]?.length);
        const sers = ser_params.split('_');
    // ---- end ----
    // ---- org - service - comments ---- 
        const [data, setData] = useState<IData>({
            org: null,
            ser: null,
            cmt: null
        });
        const [reaction, setReaction] = useState<IReact>({
            favoriteCount: 0,
            isFavorite: false
        })
        const [comment, setComment] = useState<ICmt>({
            text: '',
            url: video.link
        });
    // ---- end ---- 
        const getComments = async () => {
            const res = await dispatch(fetchAsyncOrgComments({
                org_id: id,
                page: 1
            }));
            setData({ ...data, cmt: res.payload })
        }
    //  ---- Init State ---- 
        const getInitData = async () => {
            const resOrg = await dispatch(fetchAsyncOrg(id));
            let resSerList: any = [];
            sers.map(async (item: any) => {
                const resSer = await serviceApi.getDetailById({
                    org_id: id,
                    ser_id: item
                });
                resSerList.push(resSer.data.context)
            })
            const resCmt = await dispatch(fetchAsyncOrgComments({
                org_id: id,
                page: 1
            }));
            let resData = {
                org: resOrg.payload,
                ser: resSerList,
                cmt: resCmt.payload
            };
            setData(resData);
            console.log(resCmt);
            if (resData.org.is_favorite) {
                setReaction({
                    ...reaction,
                    favoriteCount: resData.org.favorites_count,
                    isFavorite: resData.org.is_favorite
                });

            }
        }
        useEffect(() => {
            if (videoCur?.id === video?.id) {
                videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
            getInitData();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    // handle func
        const onHoverVideoItem = () => {
            setVideoCur(video)
        }
        const handleGoOrgDetail = () => {
            goSignIn();
        }
        const handleReact = async () => {
            if (reaction.isFavorite) {
                const res = dispatch(onDeleteFavoriteOrg(data.org))
                console.log(res);
                setReaction({ favoriteCount: reaction.favoriteCount-1 ,isFavorite: false })
            } else {
                const res = await dispatch(onFavoriteOrg(data.org))
                console.log(res);
                setReaction({ favoriteCount: reaction.favoriteCount+1 ,isFavorite: true })
            }
        }
        const handleComment: any = (e: any) => {
            if (!sess) {
                goSignIn();
            }
            else if (sess) {
                setComment({
                    ...comment,
                    text: e.target.value,
                });
            }
        }
        const handlePostComment = async () => {
            if (comment.text !== '') {
                dispatch(
                    postAsyncOrgComments({
                        values: {
                            page: 1,
                            org_id: id,
                            body: JSON.stringify(comment),
                        },
                        user: user,
                    })
                ).then(getComments);
                setComment({ text: '' })
            }
        };

        const handleKeyDown = (event: any) => {
            if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
                if (comment.text.length > 0 && sess) {
                    handlePostComment();
                    setComment({
                        text: "",
                        // image_url: "",
                    });
                } else {
                    goSignIn();
                }
            }
        };
        const onChangeMedia = () => {

        }
        const onRemoveImgTemp = () => {

        }
    // === end ===
        const PreviewComment = ({ index, val }: any) => {
            let body
            try {
                const cmt = JSON.parse(`${val.body}`);
                body = {
                    text: cmt.text,
                    image_url: cmt.image_url,
                    url: cmt.url
                };
            } catch (error) {
                body = {
                    text: val.body,
                    image_url: "",
                    url: ''
                };
            }
            return (
                (body.url && body.url !== '')
                    ?
                    (body.url === video.link)
                        ?
                        <div className="video-item-comments-preview_item">
                            <span className="cmt_name">{val?.user?.fullname}</span>
                            <span className="cmt_body">{body.text}</span>
                        </div>
                        :
                        <>
                        </>
                    :
                    <div className="video-item-comments-preview_item">
                        <span className="cmt_name">{val?.user?.fullname}</span>
                        <span className="cmt_body">{body.text}</span>
                    </div>
            )
        }
        const goSignIn = () => {
            scrollTop();
            history.push({
                pathname: '/sign-in',
                search: '1',
                state: { from: '/beautyx-videos' }
            })
        }
    console.log('render: ' + id,reaction)

    return (
        <>
            <header>
                <div className="video-item-header_ava"
                    onClick={handleGoOrgDetail}
                >
                    <Avatar
                        alt={data.org?.name}
                        src={data.org?.image_url}
                        sx={{ width: 32, height: 32 }} />
                    <div className='video-item-header_name'>
                        <span>{data.org?.name}</span>
                        <span className="video-item-header_time">Đã đămg 5 giờ trước</span>
                    </div>
                </div>
            </header>
            <div className="video-item_body-status">
                <span>
                    <span dangerouslySetInnerHTML={{ __html: video.title.rendered }}></span> <br />
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
                            {
                                data.ser?.map((item: any, index: any) => (
                                    <div key={index} className="video-item_product_item">
                                        <div className="video-item_product_item-img">
                                            <img src={(item?.image_url) ? item?.image_url : ''} onError={(e) => errorImg(e)} alt="" />
                                        </div>
                                        <div className="video-item_product_item-title">
                                            {item?.service_name}
                                        </div>
                                        <div className="video-item_product_item-price">
                                            {formatPrice(item?.price)} đ
                                    </div>
                                        <div className="video-item_product_item-special_price">
                                            {formatPrice(item?.price)} đ
                                    </div>
                                        <div className="video-item_product_item-add_cart">
                                            <img src={icon.shopingCartAddBlack} alt="" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="video-item_react-ctn">
                    <div className="react-btn">
                        <div className="like" onClick={handleReact}>
                            {
                                reaction.isFavorite
                                    ?
                                    <img className="icon" src={icon.heart} alt="" />
                                    :
                                    <img className="icon" src={icon.unHeartWhite} alt="" />
                            }
                            <span>{reaction.favoriteCount}</span>
                        </div>
                        <div className="comment">
                            <img className="icon" src={icon.comment} alt="" />
                            <span>{data.cmt?.totalItem}</span>
                        </div>
                        <div className="share_link">
                            <img className="icon" src={icon.share} alt="" />
                        </div>
                    </div>
                </div>
                <div className="video-item_comments">
                    {
                        data.cmt?.comments.length > 0 && (
                            <>
                                <div className="video-item-comments-preview">
                                    {
                                        data.cmt?.comments?.map((item: any, index: any) => <PreviewComment key={index} val={item} />).slice(0, 2)
                                    }
                                </div>
                                <div className="video-item-comments-read_all">
                                    xem toàn bộ {data.cmt?.totalItem} <img src={icon.vector_down} alt="icon" />
                                </div>
                            </>
                        )
                    }
                    <EvaluateInput
                        handleOnchange={handleComment}
                        comment={comment}
                        handleKeyDown={handleKeyDown}
                        user={user}
                        handlePostComment={handlePostComment}
                        onChangeMedia={onChangeMedia}
                        onRemoveImgTemp={onRemoveImgTemp}
                    />
                </div>
            </div>
            <Drawer
            open={open}
            anchor='right'
            onClose={() => setOpen(false)}
            style={{inset: 0, margin: 'auto'}}
            >
        
            </Drawer>
        </>
    );
}

export default VideoItemPc;