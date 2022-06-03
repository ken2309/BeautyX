import React from 'react';
import {IComment} from '../../interface/comments'

interface IProps{
    comments: IComment;
    totalItem:number
}

function Review(props:IProps) {
    const {comments, totalItem} = props;
    return (
        <div>

        </div>
    );
}

export default Review;