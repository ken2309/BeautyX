import React from 'react';
import icon from '../../../constants/icon';
import formatDate from '../../../utils/formatDate';
import {IComment} from '../../../interface/comments'

interface IProps{
      comment: IComment
}

function DetailCommentItem(props:IProps) {
      const {comment} = props;
      // console.log(comment.rateStar)
      // const starArr: any[] = [];
      // for (let i = 0; i < comment.rateStar; i++) {
      //       starArr.push(`<li><img src={icon.star} alt="" /></li>`)
      // }
      // const starString = starArr.toString();
      // var doc = new DOMParser().parseFromString(starString, "text/xml");
      return (
            <li className="mer-detail-cmt__box-li">
                  <div className="mer-detail-cmt__box-item">
                        <div className="flex-row-sp cmt-head">
                              <div className="flex-row-sp cmt-head__user">
                                    {/* <img src={img.Avatar} alt="" /> */}
                                    <div className="cmt-head__user-avatar">
                                          {comment?.user?.fullname?.slice(0,1)}
                                    </div>
                                    <span>
                                    <p>{comment?.user?.fullname}</p>
                                          <ul>
                                                <li>
                                                      <img src={icon.star} alt="" />
                                                </li>
                                                <li>
                                                      <img src={icon.star} alt="" />
                                                </li>
                                                <li>
                                                      <img src={icon.star} alt="" />
                                                </li>
                                                <li>
                                                      <img src={icon.star} alt="" />
                                                </li>
                                          </ul>
                                    </span>
                              </div>
                              <h3 className="date">{formatDate(comment.created_at)}</h3>
                        </div>
                        <div className="cmt-text">
                              {comment?.body}
                              {/* <button>
                                    ...Xem thêm
                              </button> */}
                        </div>
                  </div>
            </li>
      );
}

export default DetailCommentItem;