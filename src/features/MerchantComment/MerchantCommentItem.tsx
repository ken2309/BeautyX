import React, { useState } from "react";
import icon from "../../constants/icon";
import { IComment } from '../../interface/comments';
import formatDate from '../../utils/formatDate';
import FullImage from "../OpenFullImage";

interface IProps {
  comment: IComment
}

export default function MerchantCommentItem(props: IProps) {
  const { comment } = props;
  const [open, setOpen] = useState(false)
  let body;
  try {
    const cmt = JSON.parse(`${comment.body}`)
    body = {
      text: cmt.text,
      image_url: cmt.image_url
    }
  } catch (error) {
    body = {
      text: comment.body,
      image_url: ''
    }
  }
  return (
    <>
      <FullImage
        open={open}
        setOpen={setOpen}
        comment={comment}
      />
      <div>
        <div className="comment-item">
          <div className="comment-user">
            <div className="comment-user__avatar">
              {
                comment.user.avatar ?
                  <img style={{width:'100%', height:'100%', borderRadius:'100%'}} src={comment.user.avatar} alt="" />
                  :
                  comment.user.fullname?.slice(0, 1) || "K"
              }
            </div>
            <div className="comment-user__info">
              <span className="comment-user__name">{comment.user.fullname || "Khách"}</span>
            </div>
          </div>
          <div className="comment-option">
            <div className="comment-option__like">
              <img src={icon.Favorite} alt="" />
              <span>0</span>
            </div>
            <span className="create">{formatDate(comment.created_at)}</span>
          </div>
        </div>
        <div className="comment-star__all">
          <img src={icon.star} alt="" />
          <img src={icon.star} alt="" />
          <img src={icon.star} alt="" />
          <img src={icon.star} alt="" />
          <img src={icon.star} alt="" />
        </div>
        <div className="comment-evalutes">
          {/* <h3>Spectacular</h3> */}
          <p>
            {body.text}
          </p>
          {
            body.image_url?.length > 0 &&
            <img
              onClick={() => setOpen(true)}
              className="comment-evalutes__img"
              src={body.image_url} alt=""
            />
          }
        </div>
      </div>
    </>
  );
}
