import React from 'react';
import { Dialog } from '@mui/material';
import { IComment } from '../../interface/comments';
import formatDate from '../../utils/formatDate';
import './full-img.css';

interface IProps {
    open: boolean,
    setOpen: (open: boolean) => void;
    comment: IComment
}

function FullImage(props: IProps) {
    const { open, setOpen, comment } = props;
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
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="full-img-cnt">
                {
                    body.image_url?.length > 0 &&
                    <img className='full-img-cnt__img' src={body.image_url} alt="" />
                }
                <div className="full-img-cnt__de">
                    <div className="flex-row full-img-cnt__de-info">
                        <div className="avatar">
                            <span>{comment.user.fullname.slice(0, 1)}</span>
                        </div>
                        <span className="full-name">
                            {comment.user.fullname}
                        </span>
                        <span className='create'>
                            {formatDate(comment.created_at)}
                        </span>
                    </div>
                    <span className="full-img-cnt__de-text">
                        {body.text}
                    </span>
                </div>
            </div>
        </Dialog>
    );
}

export default FullImage;