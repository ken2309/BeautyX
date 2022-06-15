import icon from "../../../../constants/icon";
export default function PostReaction (props:any) {
    const {data,reaction,handleReact,handleViewAllCmt} = props;
    return (
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
                <div className="comment" onClick={handleViewAllCmt}>
                    <img className="icon" src={icon.comment} alt="" />
                    <span>{data?.cmt?.totalItem}</span>
                </div>
                <div className="share_link">
                    <img className="icon" src={icon.share} alt="" />
                </div>
            </div>
        </div>
    )
}