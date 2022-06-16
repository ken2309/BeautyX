import { Dialog } from "@mui/material";
import icon from "../../constants/icon";
import Review from "../Reviews";
import video from "./Reels/components/video";
import PostHead from "./Videos/components/post/PostHead";
import PostReaction from "./Videos/components/post/PostReaction";
import PostVideo from "./Videos/components/post/PostVideo";

export default function PopupPostDetail(props:any){
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
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >   
           <div 
                className="close_btn"
                onClick={() => setOpen(false)}
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
                        comments={cmt?.comments}
                        totalItem={cmt?.totalItem}
                        id={org?.id}
                    />
                </div>
            </div>
        </Dialog>
    )
}