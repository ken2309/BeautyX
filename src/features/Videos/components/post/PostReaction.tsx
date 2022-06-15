import icon from "../../../../constants/icon";
export default function PostReaction (props:any) {
    const {
        ORG,
        ORG_COMMENTS,
        handleReact,
        handleViewAllCmt} = props;
        console.log(ORG);
    return (
        <div className="video-item_react-ctn">
            <div className="react-btn">
                <div className="like" onClick={handleReact}>
                    {
                        ORG.org?.is_favorite
                            ?
                            <img className="icon" src={icon.heart} alt="" />
                            :
                            <img className="icon" src={icon.unHeartWhite} alt="" />
                    }
                    <span>{ORG.org?.favorites_count}</span>
                </div>
                <div className="comment" onClick={handleViewAllCmt}>
                    <img className="icon" src={icon.comment} alt="" />
                    <span>{ORG_COMMENTS?.totalItem}</span>
                </div>
                <div className="share_link">
                    <img className="icon" src={icon.share} alt="" />
                </div>
            </div>
        </div>
    )
}