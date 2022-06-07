/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IOrganization } from "../../../../interface/organization";
import { fetchAsyncOrgComments } from "../../../../redux/org/orgCommentsSlice";
import { STATUS } from "../../../../redux/status";
import Review from "../../../Reviews";

interface IProps {
    org: IOrganization;
    refReview?: any;
}

function OrgReviews(props: IProps) {
    const { org, refReview } = props;
    const dispatch = useDispatch();
    const { org_id, comments, page, totalItem, status } = useSelector(
        (state: any) => state.ORG_COMMENTS
    );

    // console.log(org_id, comments);
    const callOrgComments = () => {
        if (org?.id !== org_id || status !== STATUS.SUCCESS) {
            dispatch(
                fetchAsyncOrgComments({
                    org_id: org?.id,
                    page: 1,
                })
            );
        }
    };
    useEffect(() => {
        callOrgComments();
    }, []);
    return (
        <div ref={refReview} className="org-evaluate">
            <Review
                comments={comments}
                totalItem={totalItem}
                commentable_type={"ORGANIZATION"}
                id={org_id}
            />
        </div>
    );
}

export default OrgReviews;
