import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from "@mui/material";
import icon from "../../constants/icon";
import Review from "../Reviews";

import PostHead from "./Videos/components/post/PostHead";
import PostReaction from "./Videos/components/post/PostReaction";
import PostVideo from "./Videos/components/post/PostVideo";
// store of detail post 
    import { clearPrevState, fetchAsyncOrgComments } from '../../redux/org/orgCommentsSlice';
// end

function PopupPostDetail(props: any) {
    const {
        open,
        setOpen,
        vd_url,
        video,
        videoCur,
        setVideoCur,
        handleGoOrgDetail,
        org,
        cmt,
        reaction,
        handleReact,
        handleViewAllCmt,
    } = props;
    const dispatch = useDispatch();
    const ORG_COMMENTS = useSelector((state: any) => state.ORG_COMMENTS);
    const fetchInitState = () => {
        dispatch(clearPrevState());
        dispatch(fetchAsyncOrgComments({
            'org_id': org.id,
            'page': 1
        }))
    }
    useEffect(() => {
        let mounted = true;
        if(mounted){
            (org.id !== ORG_COMMENTS.org_id && ORG_COMMENTS.status !== 'SUCCESS')&&fetchInitState()
        }
        return () => {
            mounted = false
        }
    }, [ORG_COMMENTS.status])
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div
                className="close_btn"
                onClick={() => setOpen(false)}
            >
                <img src={icon.closeCircleWhite} alt="" />
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
                        org={org}
                        video={video}
                        handleGoOrgDetail={handleGoOrgDetail}
                    />
                    <PostReaction
                        ORG={org}
                        ORG_COMMENTS={cmt}
                        reaction={reaction}
                        handleReact={handleReact}
                        handleViewAllCmt={handleViewAllCmt}
                    />
                    <Review
                        // handleComment={handleComment}
                        commentable_type="ORGANIZATION"
                        comments={ORG_COMMENTS.comments}
                        totalItem={cmt?.totalItem}
                        id={org?.id}
                    />
                </div>
            </div>
        </Dialog>
    )
}
export default React.memo(PopupPostDetail);