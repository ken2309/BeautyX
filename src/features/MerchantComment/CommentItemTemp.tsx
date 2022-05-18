import React from 'react';
import { useSelector } from 'react-redux';
import icon from '../../constants/icon';


const d = new Date();
const year = d.getFullYear();
const month = `0${d.getMonth()}`.slice(-2);
const day = `0${d.getDate() + 1}`.slice(-2);
const now = `${day}/${month}/${year}`

function CommentItemTemp(props: any) {
    const { body } = props;
    const USER = useSelector((state:any) => state.USER.USER)
    return (
        <div>
            <div className="comment-item">
                <div className="comment-user">
                    <div className="comment-user__avatar">
                        <img src={USER?.avatar} alt="" />
                    </div>
                    <div className="comment-user__info">
                        <span className="comment-user__name">{USER?.fullname}</span>
                    </div>
                </div>
                <div className="comment-option">
                    <div className="comment-option__like">
                        <img src={icon.Favorite} alt="" />
                        <span>0</span>
                    </div>
                    <span className="create">
                        {now}
                    </span>
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
                        className="comment-evalutes__img"
                        src={body.image_url} alt=""
                    />
                }
            </div>
        </div>
    );
}

export default CommentItemTemp;