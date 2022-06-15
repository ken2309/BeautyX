import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from "@mui/material";
import { useHistory } from 'react-router-dom';
import serviceApi from "../../../api/serviceApi";
import scrollTop from "../../../utils/scrollTop";
import Review from '../../Reviews/index';
import icon from '../../../constants/icon';
import {useElementOnScreen} from '../../../utils/useElementScreen';

// post
import PostHead from './post/PostHead';
import PostReaction from './post/PostReaction';
import PostVideo from './post/PostVideo';
import PostProductList from './post/PostProductList';
// interface
import { IOrganization } from '../../../interface/organization';
import { IComment } from '../../../interface/comments';
import { Service } from '../../../interface/service';
// api
import { fetchAsyncOrg, onFavoriteOrg, onDeleteFavoriteOrg } from '../../../redux/org/orgSlice';
import { fetchAsyncOrgComments, postAsyncOrgComments } from '../../../redux/org/orgCommentsSlice';
import mediaApi from '../../../api/mediaApi';
import PostComment from './post/PostCmt';

function VideoItemPc(props: any) {
    const { video, videoCur, setVideoCur } = props;
    const sess = window.sessionStorage.getItem("_WEB_TK");
    const history = useHistory();
    const dispatch = useDispatch();
    const refCurPost = useRef<any>(null);
    
    const USER = useSelector((state: any) => state.USER);
    const ORG = useSelector((state:any) => state.ORG);
    const ORG_COMMENTS = useSelector((state:any) => state.ORG_COMMENTS);
    const [cmtDialog,setOpenCmtDialog]  = useState<any>();
    const [focus,setFocus] = useState<Boolean>();
    const user = USER.USER;
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };
    const isVisable = useElementOnScreen(options, refCurPost);
    // ---- interface ----
        interface IReact {
            favoriteCount: number;
            isFavorite: Boolean;
        }
        interface ICmt {
            text: String;
            url?: String;
            image_url?: String|null
        }
        interface Comments {
            comments?:IComment[];
            totalItem?:number
        }
        interface IData {
            org?: IOrganization | null;
            ser?: Service[]|null;
            cmt?: Comments|undefined|null
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
        const [data, setData] = useState<IData|undefined>({
            org: ORG,
            ser: null,
            cmt: ORG_COMMENTS
        });
        const [reaction, setReaction] = useState<IReact>({
            favoriteCount: 0,
            isFavorite: false
        })
        const [comment, setComment] = useState<ICmt>({
            text: '',
            url: video.link,
            image_url: ''
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
            await dispatch(fetchAsyncOrg(id));
            let resSerList: any = [];
            sers.map(async (item: any) => {
                const resSer = await serviceApi.getDetailById({
                    org_id: id,
                    ser_id: item
                });
                resSerList.push(resSer.data.context)
            })
            await dispatch(fetchAsyncOrgComments({
                org_id: id,
                page: 1
            }));
           
            let resData = {
                ...data,
                ser: resSerList,
            };
            setData(resData);
            if (resData?.org?.is_favorite) {
                setReaction({
                    ...reaction,
                    favoriteCount: resData.org.favorites_count,
                    isFavorite: resData.org.is_favorite
                });

            }
        }
        useEffect(()=>{
            isVisable&&ORG.status!=='SUCCESS'&&getInitData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[isVisable,ORG.status])
    // handle func
        const handleGoOrgDetail = () => {
            goSignIn();
        }
        const handleComment = (e: any) => {
            if (!user) {
                goSignIn();
            }
            else if (user) {
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
                if (comment.text.length > 0 && user) {
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
        const onChangeMedia = (e: any) => {
            const media = e.target.files[0];
            if (user && media) {
                handlePostMedia(media);
            } else if (!user) {
                console.log("comments not found");
                goSignIn();
            }
        };
        const handlePostMedia = async (media: any) => {
            let formData = new FormData();
            formData.append("file", media);
            try {
                const res = await mediaApi.postMedia(formData);
                setComment({
                    ...comment,
                    image_url: res.data.context.original_url,
                });
            } catch (error) {
                console.log(error);
            }
        };
    
        const onRemoveImgTemp = () => {
            setComment({ ...comment, image_url: null });
        };
    // === end ===
        const handleReact = async () => {
            if (reaction.isFavorite) {
                const res = dispatch(onDeleteFavoriteOrg(data?.org))
                console.log(res);
                // setReaction({ favoriteCount: reaction.favoriteCount-1 ,isFavorite: false })
            } else {
                const res = await dispatch(onFavoriteOrg(data?.org))
                console.log(res);
                // setReaction({ favoriteCount: reaction.favoriteCount+1 ,isFavorite: true })
            }
        }
        const goSignIn = () => {
            scrollTop();
            history.push({
                pathname: '/sign-in',
                search: '1',
                state: { from: '/beautyx-videos' }
            })
        }
        const handleViewAllCmt = () => {
            setOpenCmtDialog(true);
            setFocus(true)
        }
        

    console.log('render: ' + id,isVisable)
    return (
        <div
            ref={refCurPost}
        >
            <PostHead
                data={data}
                video={video}
                handleGoOrgDetail={handleGoOrgDetail}
            />
            <div className="video-item_body">
                <div className="video-item_body-image">
                    <PostVideo
                        vd_url={vd_url}
                        video={video}
                        videoCur={videoCur}
                        setVideoCur={setVideoCur}
                    />
                    <PostProductList
                        data={data}
                    />
                </div>
                <PostReaction
                    data={data}
                    ORG={ORG}
                    ORG_COMMENTS={ORG_COMMENTS}
                    reaction={reaction}
                    handleReact={handleReact}
                    handleViewAllCmt={handleViewAllCmt}
                />
                <PostComment
                    data={data}
                    video={video}
                    handleComment={handleComment}
                    comment={comment}
                    handleViewAllCmt={handleViewAllCmt}
                    handleKeyDown={handleKeyDown}
                    user={user}
                    handlePostComment={handlePostComment}
                    onChangeMedia={onChangeMedia}
                    onRemoveImgTemp={onRemoveImgTemp}
                />
            </div>
            
            <Dialog
                open={cmtDialog}
                onClose={() => setOpenCmtDialog(false)}
            >   
                <div 
                    className="close_btn"
                    onClick={() => setOpenCmtDialog(false)}
                >
                   <img src={icon.closeCircleWhite} alt=""/>
                </div>
                <div className="video-item_dialog">
                    <PostVideo
                        vd_url={vd_url}
                        video={video}
                        videoCur={videoCur}
                        setVideoCur={setVideoCur}
                    />
                    <div className="video-item_dialog-body">
                        <PostHead
                            data={data}
                            video={video}
                            handleGoOrgDetail={handleGoOrgDetail}
                        />
                        <PostReaction
                            data={data}
                            reaction={reaction}
                            handleReact={handleReact}
                            handleViewAllCmt={handleViewAllCmt}
                        />
                        <Review
                            commentable_type="ORGANIZATION"
                            comments={data?.cmt?.comments}
                            totalItem={data?.cmt?.totalItem}
                            id={data?.org?.id}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default VideoItemPc;