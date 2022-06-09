import React from 'react';
import { Drawer } from "@mui/material";
import './style.css'
import useFullScreen from '../../utils/useFullScreen';
import Review from '../Reviews';
import { IComment } from '../../interface/comments'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { fetchAsyncOrgComments } from '../../redux/org/orgCommentsSlice';

interface IProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    commentable_type: string,
    comments: IComment[],
    totalItem: number,
    page: number,
    org_id: number
}

function ReviewsContainer(props: IProps) {
    const { open, setOpen, comments, totalItem, org_id, page } = props;
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const anchor = IS_MB ? "bottom" : "right";
    const onViewMore = () => {
        console.log('xxx')
        if (totalItem < 15 && comments.length < totalItem) {
            dispatch(
                fetchAsyncOrgComments({
                    org_id: org_id,
                    page: page + 1,
                })
            );
        }
    }
    return (
        <Drawer
            open={open}
            anchor={anchor}
            onClose={() => setOpen(false)}
        >
            <div className="all-review-cnt">
                <InfiniteScroll
                    dataLength={comments.length}
                    loader={<></>}
                    hasMore={true}
                    next={onViewMore}
                >
                    <Review
                        commentable_type="ORGANIZATION"
                        comments={comments}
                        totalItem={totalItem}
                        id={org_id}
                        page={page}
                    />
                </InfiniteScroll>
            </div>
        </Drawer>
    );
}

export default ReviewsContainer;